"use strict";
exports.__esModule = true;
var ProfileIdentity_1 = require("../profile-identifier/ProfileIdentity");
var Post = function (_a) {
    var data = _a.data;
    return (React.createElement("div", { className: "post" },
        React.createElement("div", { className: "post__header" },
            React.createElement(ProfileIdentity_1["default"], { data: { username: data.user_name, image: data.owner_image } })),
        React.createElement("div", { className: "post__main" },
            React.createElement("div", { className: "post__main-img" },
                React.createElement("img", { loading: "lazy", src: data.file, alt: "" }))),
        React.createElement("div", { className: "post__footer" },
            React.createElement("div", { className: "post__footer-top" },
                React.createElement("div", { className: "post__footer-top-interactions" },
                    React.createElement("button", { className: "post__footer-top-interactions-btn" },
                        React.createElement("i", { className: "fa-regular fa-comment" })),
                    React.createElement("button", { className: "post__footer-top-interactions-btn" },
                        React.createElement("i", { className: "fa-regular fa-heart" })),
                    React.createElement("button", { className: "post__footer-top-interactions-btn" },
                        React.createElement("i", { className: "fa-solid fa-eye" })),
                    React.createElement("button", { className: "post__footer-top-interactions-btn" },
                        React.createElement("i", { className: "fa-regular fa-envelope" }))),
                React.createElement("p", { className: "post__footer-top-date" }, data.date
                    ? data.date.split(" ")[1] + " " + data.date.split(" ")[2] + data.date.split(" ")[3]
                    : "")),
            React.createElement("p", { className: "post__footer-description" }, data.description))));
};
exports["default"] = Post;
