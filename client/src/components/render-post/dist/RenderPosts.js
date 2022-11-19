"use strict";
exports.__esModule = true;
var Post_1 = require("./Post");
require("./RenderPost.sass");
var RenderPosts = function (props) {
    var data = props.data.data;
    console.log(data);
    var posts = [];
    try {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var element = data_1[_i];
            posts.push(React.createElement(Post_1["default"], { key: element.id, data: element }));
        }
    }
    finally {
        return React.createElement(React.Fragment, null, posts ? posts.reverse() : React.createElement(React.Fragment, null));
    }
};
exports["default"] = RenderPosts;
