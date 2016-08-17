import React from 'react';
import ReactDOM from 'react-dom';

var imgDatas = require('../data/data.json');

//图像由模块导入，路径处理
var imageDataArray = (function getImageUrl(imgDatas){
    var imgArray = [];
    for(var i = 0 ; i < imgDatas.length ; i++){
        var singleImageData = imgDatas[i];
        //有点困惑（require里变量不能带路径？比如./这样的东西）
        singleImageData.img = require( '../images/' + singleImageData.img );
        imgArray[i] = singleImageData;
    }
    return imgArray;
})(imgDatas)


var ImgFigure = React.createClass({

    render: function () {
        return(
            <figure>
                <img src={this.props.data.img}  className= "img"/>
                <strong className= "caption">{this.props.data.caption}</strong>
            </figure>
        )
    }
})


var GalleryByReactApp = React.createClass({
    Constant: {
        centerPos:{
            left: 0,
            right: 0
        },
        hPosRange:{
            leftSecX: [0,0],
            rightSecx: [0,0],
            y:[0,0]
        },
        vPosRange: {
            x: [0,0],
            topY:[0,0]
        }
    },

    //重新排列所有图片
    rearrange: function (centerIndex) {
        // var imgsArrange = this.state.imgsArrange,
        //     Constant = this.Constant,
        //     centerPos = Constant.centerPos,
        //     hPosRange = Constant.hPosRange,
        //     vPosRange = Constant.vPosRange;
    },
    getInitialState: function () {
        return{
            imgsArrange:[
                {
                    pos:{
                        left: '0',
                        top: '0'
                    }
                }
            ]
        };
    },

    //组件加载后，判定窗口大小
    componentDidMount: function () {
        var stageDom = this.refs.stage;
        // console.log(stageDom);
        var stageW = stageDom.scrollWidth,
            stageH = stageDom.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);

        //获取imgFigure的大小
        var imgFigureDom = this.refs.imgFigure0,
            imgW = imgFigureDom.scrollWidth,
            imgH = imgFigureDom.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        this.Constant.centerPos = {
            left: halfStageW - halfImgH,
            top: halfStageH - halfImgH
        };

        //计算图片位置范围
        var edithRange = this.Constant.hPosRange;
        var editvRange = this.Constant.vPosRange;

        edithRange.leftSecX[0] = -halfImgW;
        edithRange.leftSecX[1] = halfImgW - halfImgW * 3;
        edithRange.rightSecx[0] = halfImgW + halfImgW;
        edithRange.rightSecx[1] = stageW - halfImgW;
        edithRange.y[0] = -halfImgW;
        edithRange.y[1] = stageH - halfImgW;

        editvRange.topY[0] = -halfImgH;
        editvRange.topY[1] = halfStageH - halfImgH * 3;
        editvRange.x[0] = halfStageW - imgW;
        editvRange.x[1] = halfStageW;


        this.rearrange(0);
    },

    render: function () {
        console.log(this);

        var controllerUnits = [],
            imgFigures = [];

        imageDataArray.forEach(function (value, index) {
            if (!this.state.imgsArrange[index]) {
                this.state.imgsArrange[index] = {
                    pos:{
                        left: 0,
                        top: 0
                    }
                }
            }
            imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index}/>);
        }.bind(this));
        // console.log(imgFigures);

        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
})

ReactDOM.render(
    <GalleryByReactApp/>, document.getElementById('app')
);

module.exports = GalleryByReactApp;
