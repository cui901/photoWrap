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
                <img src={this.props.data.img}/>
                <figcaption>
                    <strong></strong>
                </figcaption>
            </figure>
        )
    }
})


var GalleryByReactApp = React.createClass({
    render: function () {

        var controllerUnits = [],
            imgFigures = [];

        imageDataArray.forEach(function (value) {
            imgFigures.push(<ImgFigure data={value} />);
        });
        console.log(imgFigures);

        return (
            <section className="stage">
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
