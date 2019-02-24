
export default function() {
    let baseUrl;

    this.setBaseUrl = function (url) {
        baseUrl = url;
    };

    this.$get = function () {
        return {
            baseUrl
        };
    };
}
