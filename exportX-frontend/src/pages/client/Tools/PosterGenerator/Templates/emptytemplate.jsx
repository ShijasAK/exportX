import APP_ICONS from "../../../../../config/constants/icons"
import APP_IMAGES from "../../../../../config/constants/images"
const emptyTemplate = [ 
    {
        template: 'template1',
        name: 'Instagram Post',
        icon: APP_IMAGES.PINSIZE,
        texts:[],
        rectangles: [


        ],
        paths: [
        ],
        canvasSize: {
            spacing: 50,
            width: 500,
            height: 750
        },
        stage: {
            height: 750,
            width: 500,
            cornerRadius: 180
        },
        background: {
            x: 0,
            y: 0,
            width: 500,
            height: 750,
            fill: '#ffffff'
        },
        watermark: {
            width: 100,
            height: 100,
        },
        image: {
            x: 0,
            y: 460,
            width: 500,
            height:400,
            scaleX: 1,
            scaleY: 1,
            
        },
        logo: {
            x: 30,
            y: 30,
            width: 80,
            height: 80,
        },
        mainContent: {
            x: 30,
            y: 125,
            text: 'Craving Delicious Momos?',
            fontSize: 34,
            fontFamily: 'Calibri',
            fill: '#377979',
            fontStyle: 'bold',
        },
        subContent: {
            x: 30,
            y: 155,
            text: 'Savor momo magic',
            fontSize: 38,
            fontFamily: 'Calibri',
            fill: '#b02439',
            fontStyle: 'bold',
        },
        btnBox: {
            x: -20,
            y: 220,
            width: 220,
            height: 50,
            fill: '#b02439',
            cornerRadius: [20, 20, 20, 20],
        },
        btnText: {
            x: 30,
            y: 235,
            text: 'Taste it now',
            fontSize: 22,
            fontFamily: 'Calibri',
            fill: '#ffffff',
            fontStyle: 'bold',
        },
        backgroundImage: ''
    },
    {
        name: 'Insatgram Story',
        icon: APP_IMAGES.POSTSIZE,
        texts:[],
        rectangles: [


        ],
        paths: [
            

        ],
        canvasSize: {
            spacing: 50,
            width: 750,
            height: 750
        },
        stage: {
            height: 750,
            width: 750,
            cornerRadius: 180
        },
        background: {
            x: 0,
            y: 0,
            width: 750,
            height: 750,
            fill: '#ffffff'
        },
        watermark: {
            width: 150,
            height: 150,
        },
        image: {
            x: 0,
            y: 380,
            // scaleX: 1.5,
            // scaleY: 1.5,
            width:750,
            height:500,
            
        },
        logo: {
            x: 30,
            y: 30,
            width: 80,
            height: 80,
        },
        mainContent: {
            x: 30,
            y: 125,
            text: 'Craving Delicious Momos?',
            fontSize: 34,
            fontFamily: 'Calibri',
            fill: '#377979',
            fontStyle: 'bold',
        },
        subContent: {
            x: 30,
            y: 155,
            text: 'Savor momo magic',
            fontSize: 38,
            fontFamily: 'Calibri',
            fill: '#b02439',
            fontStyle: 'bold',
        },
        btnBox: {
            x: -20,
            y: 220,
            width: 220,
            height: 50,
            fill: '#b02439',
            cornerRadius: [20, 20, 20, 20],
        },
        btnText: {
            x: 30,
            y: 235,
            text: 'Taste it now',
            fontSize: 22,
            fontFamily: 'Calibri',
            fill: '#ffffff',
            fontStyle: 'bold',
        }
    },
    {
        name: 'Facebook Post',
        icon: APP_IMAGES.VERTICALSIZE,
        texts:[],
        rectangles: [

        ],
        paths: [

        ],
        canvasSize: {
            spacing: 50,
            width: 360,
            height: 640
        },
        stage: {
            height: 640,
            width: 360,
            cornerRadius: 180
        },
        background: {
            x: 0,
            y: 0,
            width: 360,
            height: 640,
            fill: '#ffffff'
        },
        watermark: {
            width: 100,
            height: 100,
        },
        image: {
            x: 0,
            y: 380,
                // scaleX: 1,
                // scaleY: 1,
                width:360,
                height:280,
            
        },
        logo: {
            x: 30,
            y: 30,
            width: 80,
            height: 80,
        },
        mainContent: {
            x: 30,
            y: 125,
            text: 'Craving Delicious Momos?',
            fontSize: 34,
            fontFamily: 'Calibri',
            fill: '#377979',
            fontStyle: 'bold',
        },
        subContent: {
            x: 30,
            y: 195,
            text: 'Savor momo magic',
            fontSize: 38,
            fontFamily: 'Calibri',
            fill: '#b02439',
            fontStyle: 'bold',
        },
        btnBox: {
            x: -20,
            y: 260,
            width: 220,
            height: 50,
            fill: '#b02439',
            cornerRadius: [20, 20, 20, 20],
        },

        btnText: {
            x: 30,
            y: 275,
            text: 'Taste it now',
            fontSize: 22,
            fontFamily: 'Calibri',
            fill: '#ffffff',
            fontStyle: 'bold',
        }
    },
    {
        name: 'Facebook Story',
        icon: APP_IMAGES.VERTICALWIDE,
        texts:[],
        rectangles: [

        ],
        paths: [

        ],
        canvasSize: {
            spacing: 50,
            width: 540,
            height: 675
        },
        stage: {
            height: 675,
            width: 540,
            cornerRadius: 180
        },
        background: {
            x: 0,
            y: 0,
            width: 540,
            height: 675,
            fill: '#ffffff'
        },
        watermark: {
            width: 100,
            height: 100,
        },
        image: {
            x: 0,
            y: 380,
            // scaleX: 1.1,
            // scaleY: 1.1,
            width:540,
            height:300,
            
        },
        logo: {
            x: 30,
            y: 30,
            width: 80,
            height: 80,
        },
        mainContent: {
            x: 30,
            y: 125,
            text: 'Craving Delicious Momos?',
            fontSize: 34,
            fontFamily: 'Calibri',
            fill: '#377979',
            fontStyle: 'bold',
        },
        subContent: {
            x: 30,
            y: 155,
            text: 'Savor momo magic',
            fontSize: 38,
            fontFamily: 'Calibri',
            fill: '#b02439',
            fontStyle: 'bold',
        },
        btnBox: {
            x: -20,
            y: 230,
            width: 220,
            height: 50,
            fill: '#b02439',
            cornerRadius: [20, 20, 20, 20],
        },
        btnText: {
            x: 30,
            y: 245,
            text: 'Taste it now',
            fontSize: 22,
            fontFamily: 'Calibri',
            fill: '#ffffff',
            fontStyle: 'bold',
        }
    },
    {
        name: 'Facebook Highlight',
        icon: APP_IMAGES.LANDSCAPESIZE,
        texts:[],
        rectangles: [

        ],
        paths: [

        ],
        canvasSize: {
            width: 1200,
            height: 628
        },
        stage: {
            height: 628,
            width: 1200,
            cornerRadius: 180
        },
        background: {
            x: 0,
            y: 0,
            width: 1200,
            height: 628,
            fill: '#ffffff'
        },
        watermark: {
            width: 100,
            height: 100,
        },
        image: {
            x: 0,
            y: 230,
            // scaleX: 1,
            // scaleY: 1,
            width:800,
            height:500,
            
        },
        logo: {
            x: 30,
            y: 30,
            width: 80,
            height: 80,
        },
        mainContent: {
            x: 450,
            y: 75,
            text: 'Craving Delicious Momos?',
            fontSize: 54,
            fontFamily: 'Calibri',
            fill: '#377979',
            fontStyle: 'bold',
            draggable: true,
        },
        subContent: {
            x: 450,
            y: 125,
            text: 'Savor momo magic',
            fontSize: 45,
            fontFamily: 'Calibri',
            fill: '#b02439',
            fontStyle: 'bold',
        },
        btnBox: {
            x: -20,
            y: 130,
            width: 320,
            height: 50,
            fill: '#b02439',
            cornerRadius: [20, 20, 20, 20],
        },
        btnText: {
            x: 30,
            y: 145,
            text: 'Taste it now',
            fontSize: 22,
            fontFamily: 'Calibri',
            fill: '#ffffff',
            fontStyle: 'bold',
        }
    }
]



export default emptyTemplate