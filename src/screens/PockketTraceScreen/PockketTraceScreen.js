import React, { useState, useEffect } from 'react'
import { Text, FlatList, View, Dimensions } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import {PieChart} from "react-native-chart-kit";

export default function PockketTraceScreen(props) {
    const [expenseData, setExpenseData] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [pieChartData, setPieChartData] = useState([]);

    const userID = props.route.params.userID;
    const chartWidth = Dimensions.get("window").width * .9;

    const transactions = firebase.firestore().collection("transactions")
    const transactionTypes = [
        "Pay Bill",
        "Buy Load",
        "Fund Transfer",
        "Bank Transfer",
        "Pay QR"
    ]

    const getTotalExpenseAmountPerType = (expenses, type) => {
        const filteredExpenses = expenses.filter(expense => expense.type === type);

        let total = 0;
        for(let expense of filteredExpenses) {
            total += Number(expense.amount)
        }

        return total;
    }

    const getColor = (type) => {
        switch (type) {
            case "Pay Bill":
                return "#AC92EB";
            case "Buy Load":
                return "#4FC1E8";
            case "Fund Transfer":
                return "#A0D568";
            case "Bank Transfer":
                return "#FFCE54";
            case "Pay QR":
                return "#ED5564";
            default:
                return "black";
        }
    }
 
    useEffect(() => {
        let unsubRef = transactions.where("sender", "==", userID).orderBy("date", "desc")
            .onSnapshot((querySnapshot) => {
                let expenses = [];
                let totalExpenses = 0;
                
                querySnapshot.forEach((doc) => {
                    expenses.push({...doc.data(), id: doc.id});
                    totalExpenses += Number(doc.data().amount);
                });
                setExpenseData(expenses);
                setTotalExpenses(totalExpenses);

                let chartData = [];

                for(let type of transactionTypes) {
                    let chartObject = {};
                    chartObject.name = type;
                    chartObject.amount = getTotalExpenseAmountPerType(expenses, type);
                    chartObject.color = getColor(type);
                    chartObject.legendFontColor = "#7F7F7F";
                    chartObject.legendFontSize = 15;

                    chartData.push(chartObject);
                }

                setPieChartData(chartData);
            });
        
        return () => unsubRef();
    }, [])

    const renderItem = ({ item }) => (
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
            <View style={{width: '60%'}}>
                <Text style={{fontWeight: 'bold'}}>{item.type}</Text>
                <Text>{item.receiver}</Text>
                <Text>{new Date(item.date).toLocaleString()}</Text>
            </View>
            <View style={{width: '40%'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: 'red'}}>PHP {item.amount}</Text>
            </View>
        </View>
    );

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };


    return (
        <View style={styles.container}>
            <Text>Total Expenses</Text>
            <Text style={{fontSize: 40, fontWeight: 'bold'}}>PHP {totalExpenses}</Text>

            <PieChart
                data={pieChartData}
                width={chartWidth}
                height={250}
                chartConfig={chartConfig}
                accessor={"amount"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute
            />

            <Text>Transaction History</Text>
            <FlatList
                style={{width: '100%', maxHeight: 300}}
                data={expenseData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}