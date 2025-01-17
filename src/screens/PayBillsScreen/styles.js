import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
        backgroundColor:"white"
        // alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    },
    cardContainer: {
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10.0,
        padding: 15,
        marginBottom:20,
        flex: 1,
        flexDirection: 'row',
        maxHeight: 200
    },
    cardTitle: {
        marginBottom: 10,
        color:'#f44336',
        fontWeight:'bold'
    },
    cardValue: {
        color:'#673ab7',
        fontWeight:'bold',
        fontSize:25
    },
    sectionTitle:{
        marginBottom: 10,
        color:'#673ab7',
        fontWeight:'bold'
    },
    buttonLoginTouchable: {
        alignItems: 'center',
        marginBottom:20,
    },
    serviceButtonText: {
        textAlign:"center"
    }
})
