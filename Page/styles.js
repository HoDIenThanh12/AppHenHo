import { StyleSheet } from 'react-native'
export default StyleSheet.create({
  container: {
    flex: 1,
    width: width(100),
    paddingHorizontal: width(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height(1)
  },
  chooseLangContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  titleText: {
    marginBottom: height(9),
    fontWeight: 'bold',
    fontSize: commonSize.text24
  },
  btnStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: commonSize._120px,
    width: width(43),
    borderRadius: 8,
    borderWidth: 1
  },
  btnStyleLightmode: {
    borderColor: Colors.GRAY5
  },
  btnStyleDarkmode: {
    borderColor: DarkColors.BORDER_BOX,
    backgroundColor: DarkColors.BOX_BACKGROUND
  },
  flagStyle: {
    height: width(8),
    width: width(8),
    marginBottom: commonSize._15px,
    resizeMode: 'contain'
  },
  containerMess: {
    // backgroundColor: Colors.BORDER_BOX

  },
  messSend: {
    backgroundColor: Colors.GRAY5,
    marginTop: height(1.5),
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-start'
  },
  messReceive: {
    backgroundColor: Colors.BLUE,
    marginTop: height(1.5),
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-end'
  },
  // add new test
  // View build
  itemBuild: {
    marginBottom: height(2)

  },
  containerBuild: {
    backgroundColor: Colors.WHITE,
    padding: height(2),
    borderRadius: 10,
    elevation: 6,
    shadowColor: Colors.BLACK
  },
  nameCustomerBuild: {
    color: Colors.BLACK,
    // fontSize: height(2),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  sdtCustomerBuild: {
    color: Colors.GRAY3
  },
  dateBuild: {
    color: Colors.GRAY3
  },
  totalMoneyBuild: {
    color: 'red'
  },
  contentBuild: {
    color: Colors.GRAY3,
    width: width(70)
  },
  // setup All
  textAll: {
    paddingVertical: 5
  },
  // search worker
  imgAvatarWorker: {
    height: height(5),
    padding: 5,
    width: width(20),
    alignItems: 'center',
    marginTop: height(1.3)
    // alignSelf: 'center',
    // backgroundColor: Colors.RED
  },
  contentDetailDistance: {
    width: width(50)
  },
  containerWorker: {
    paddingVertical: 6
  },
  containerWorkerDetail: {
    flexDirection: 'row',
    // marginTop: 5,
    backgroundColor: Colors.WHITE,
    paddingVertical: 5,
    paddingBottom: 10,
    borderRadius: 10
  },
  titleContentWorker: {
    fontWeight: 'bold',
    color: Colors.BLACK
  },
  numberPhonetDetailWorker: {
    color: Colors.BLACK
  },
  distanceContentWorker: {
    color: Colors.RED,
    fontSize: height(1.5)
    // textAlign:'right'
  },
  viewContentWorker: {
    color: DarkColors.BORDER_BOX,
    fontSize: height(1.5)
  },
  contentDetailText: {
    fontWeight: 'bold',
    marginBottom: height(0.4),
    color: Colors.GRAY1
  },
  contentDetailDate: {
    fontSize: height(1),
    color: Colors.RED
  },
  containerGitChat: {
    marginTop: height(10),
    width: width(90),
    backgroundColor: Colors.GRAY6,
    height: height(40),
    padding: 10
  },
  containerAvatar: {
    // display: 'flex',
    // backgroundColor: Colors.GRAY6,
    width: width(90),
    paddingVertical: 30
  },
  imgAvatar: {
    resizeMode: 'contain',
    height: height(15),
    width: width(90)
  },
  containerTest: {
    marginTop: height(10)
  },
  containerInfo: {
    flexDirection: 'row',
    width: width(90),
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.GRAY6,
    marginVertical: 10,
    borderColor: Colors.BORDER_BOX,
    // borderWidth: 1,
    borderRadius: 10,
    elevation: 10
  },
  titleContent: {
    color: Colors.GRAY1
  },
  contentDetail: {
    color: Colors.GRAY1
  },
  contentDetailLuotXem: {
    color: Colors.RED
  },
  containerTestBtn: {
    position: 'absolute',
    flexDirection: 'row',
    width: width(90),
    justifyContent: 'space-around',
    display: 'flex'
    // top: height(35),
    // marginTop: height(20),

  },
  styleBtnTest: {
    width: width(34)
  }
})
