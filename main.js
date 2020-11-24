'use strict';

// OpenWeatherMap
 const apiKey = '33579c8a3f090b112976e56886f95d1a';

 const getRequestURl = (selected) => {
    const parameter = $.param({
        q: selected,
        appid: apiKey,
        units:'metric',
        lang: 'jp',
    });
    const url = `https://api.openweathermap.org/data/2.5/forecast?${parameter}`;
    return url;
 };

 new Vue({
     el: '#app',
     data: {
        city: "東京",
        icon: null,
        temp: null,
        windSpeed: null,
        humidity: null,
        selected: 'Tokyo',
        options: [
           {id:1, name:"Tokyo"},
           {id:2, name:"New York"},
           {id:3, name:"Moscow"},
           {id:4, name:"Madrid"},
           {id:5, name:"Paris"},
        ],
     },

     created() {
        const url = getRequestURl('Tokyo');

        axios.get(url)
        .then((response) => {
            // console.log(response);
            this.icon = response.data.list[0].weather[0].icon;
            this.temp = response.data.list[0].main.temp;
            this.windSpeed = response.data.list[0].wind.speed;
            this.humidity = response.data.list[0].main.humidity;
            })
        .catch((error) => {
            console.log(error);
        });
    },

     methods: {

        fetchGetWeather(event) {

            const weatherUrl = getRequestURl(this.selected);

            axios.get(weatherUrl)
            .then((response) => {
                // console.log(response);
                this.icon = response.data.list[0].weather[0].icon;
                this.temp = response.data.list[0].main.temp;
                this.windSpeed = response.data.list[0].wind.speed;
                this.humidity = response.data.list[0].main.humidity;
                })
            .catch((error) => {
                console.log(error);
            });

            if (this.selected === 'Tokyo') {
                this.city = '東京';
            } else if (this.selected === 'New York') {
                this.city = 'ニューヨーク';
            }　else if (this.selected === 'Moscow') {
                this.city = 'モスクワ';
            }　else if (this.selected === 'Madrid') {
                this.city = 'マドリード';
            }　else if (this.selected === 'Paris') {
                this.city = 'パリ';
            }
     
        }}
    });

// カレンダー
{
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    function getCalendarHead() {
        const dates = [];
        const d = new Date(year, month, 0).getDate();
        const n = new Date(year, month, 1).getDay();

        for (let i = 0; i < n; i++) {
            dates.unshift({
                date: d - i,
                isToday: false,
                isDisabled: true,
            });
        }
        return dates;
    }

    function getCalendarBody() {
        const dates = [];
        const lastDate = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i <= lastDate; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: false,
            });

        }
        dates[today.getDate() - 1].isToday = true;
        return dates;
    }

    function getCalendarTail() {
        const dates = [];
        const n = new Date(year, month + 1, 0).getDay();

        for (let i = 1; i < 7 - n; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: true,
            });
        }
        return dates;
    }

    function createCalendar() {
        const title = `${year}/${String(month + 1).padStart(2, '0')}`;
        document.getElementById('title').textContent = title;

        const dates = [
            ...getCalendarHead(),
            ...getCalendarBody(),
            ...getCalendarTail(),
        ];

        const weeks = [];
        const weeksCount = dates.length / 7;

        for (let i = 0; i < weeksCount; i++) {
            weeks.push(dates.splice(0, 7));
        }

        weeks.forEach(week => {
            const tr = document.createElement('tr');

            week.forEach(date => {
                const td = document.createElement('td');

                td.textContent = date.date;
                if (date.isToday) {
                    td.classList.add('today');
                }
                if (date.isDisabled) {
                    td.classList.add('disabled');
                } 
                tr.appendChild(td);
            });
            document.querySelector('tbody').appendChild(tr);
        });
    }     
    createCalendar();
}

