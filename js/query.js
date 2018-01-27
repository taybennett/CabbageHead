$(document).ready(function() {

    var weatherApp = new Vue({
        el: "#weatherApp",
        data: {
            zipCode: null,
            cWeather: null,
            fWeather: [],
            sFood: null,
            zFood: false
        },
        methods: {
            submitZip: function() {
                var that = this;

                var queryURL ="https://api.openweathermap.org/data/2.5/weather?zip="+ this.zipCode +",us&units=imperial&appid=810f1b099f115123133ea07badef9acb";
                $.ajax({
                    url:queryURL,
                    method:'GET'})
                    .done(function(response){
                        that.cWeather = response;
                    });
                var queryURL ="https://api.openweathermap.org/data/2.5/forecast?zip="+ this.zipCode +",us&units=imperial&appid=810f1b099f115123133ea07badef9acb";
                $.ajax({url:queryURL, method:'GET'})
                    .done(function(response){
                        that.fWeather = [];
                        // comes in 3 hours increments...we just want one per day.
                        for(var i = (response.list.length - 1); i > 0; i -= 8) {
                            that.fWeather.push(response.list[i])
                        }
                    })
            },
            formatDate: function(date) {
                console.log(date)
                console.log(moment(date).format('dddd'))
                return moment(date).format('dddd');
            },
            icon: function(iconCode) {
                return "https://openweathermap.org/img/w/" + iconCode + ".png";
            }
        },
        computed: {
            forecast: function () {
                return this.fWeather.reverse();
            }
        }
    });


    var foodApp = new Vue({
        el: "#food",
        data: {
            city: null,
            entity_id: null,
            trending: [],
            searched: false,
            loading: false
        },
        methods: {
            foodFetch: function() {
                this.searched = false;
                this.loading = true;
                var that = this;
                this.trending = [];
                $.ajax({
                    url: "https://developers.zomato.com/api/v2.1/cities?q="+this.city,
                    beforeSend: function(request) {
                        request.setRequestHeader("user-key", "c1f8756961eb0c55ab93d4c4c1fd4812");
                    }
                }).done(function(response) {
                    if (response.location_suggestions.length === 0) {
                        that.loading = false;
                        return that.searched = true;
                    } else {
                        that.entity_id = response.location_suggestions[0].id;
                        $.ajax({
                            url: 'https://developers.zomato.com/api/v2.1/search?entity_id='+ that.entity_id +'&entity_type=city&collection_id=1',
                            beforeSend: function(request) {
                                request.setRequestHeader("user-key", "c1f8756961eb0c55ab93d4c4c1fd4812");
                            }
                        }).done(function(resp) {
                            that.trending = resp.restaurants;
                            that.searched = true;
                            that.loading = false;
                        });
                    }
                });

            }
        }
    });


});

