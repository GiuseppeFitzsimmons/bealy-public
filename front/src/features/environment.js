module.exports={
    /*server:{
        url: ""
    },*/
    local: {
        url: "http://localhost:3001",
        socket: "http://localhost:3001"
    },
    getEnvironment: function(url) {
        if (url.toLowerCase().indexOf('local')>-1 || url.indexOf('127')>-1) {
            return this.local;
        } else {
            return this.server;
        }
    }

}
