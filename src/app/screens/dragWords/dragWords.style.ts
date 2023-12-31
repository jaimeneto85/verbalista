import { StyleSheet} from 'react-native';
export const dragWordStyle = StyleSheet.create({
  inputBox: {
    bottom: 20,
    left: 0,
    height: 100,
    minHeight: 100,
    paddingHorizontal: 20,
    position: 'absolute',
    right: 0,
  },
  icon: {
    marginTop: 10,
    marginRight: 10,
  },
  inputField: {
    backgroundColor: '#DDD'
  },
  wordsWrapper:{
    bottom: 100,
    paddingHorizontal:20,
    left:0,
    right:0,
    position:'absolute',
  },
  wordsContainer:{
    alignItems:'center',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  word: {
    backgroundColor:'#FFF',
    borderRadius:15,
    borderColor:'#DDD',
    borderWidth:1,
    elevation:5,
    shadowColor:'#000',
    shadowOpacity:0.15,
    shadowOffset:{
      width:0,
      height:2,
    },
    paddingVertical:5,
    paddingHorizontal:5,
  },
  successContainer:{
    backgroundColor: '#10b981',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
  failContainer:{
    backgroundColor: '#f43f5e',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
});