$.extend($.fn, {
    fnTimeCountDown: function (d,reltime, callback) {

        var personTime = new Date();
        var relTime = new Date(reltime);
        var difTime=relTime-personTime.getTime();

        this.each(function () {
            var $this = $(this);
            var o = {
                hm: $this.find(".hm"),
                sec: $this.find(".sec"),
                mini: $this.find(".mini"),
                hour: $this.find(".hour"),
                day: $this.find(".day"),
                month: $this.find(".month"),
                year: $this.find(".year")
            };
            var f = {
                haomiao: function (n) {
                    if (n < 10) return "00" + n.toString();
                    if (n < 100) return "0" + n.toString();
                    return n.toString();
                },
                zero: function (n) {
                    var _n = parseInt(n, 10);//解析字符串,返回整数
                    if (_n > 0) {
                        if (_n <= 9) {
                            _n = "0" + _n
                        }
                        return String(_n);
                    } else {
                        return "00";
                    }
                },
                dv: function () {
                    //d = d || Date.UTC(2050, 0, 1); //如果未定义时间，则我们设定倒计时日期是2050年1月1日
                    var _d = $this.data("end") || d;
                    var now = new Date(),
                        endDate = new Date(_d);
                    //现在将来秒差值
                    //alert(future.getTimezoneOffset());
                    var dur = (endDate - now.getTime()-difTime) / 1000, mss = endDate - now.getTime()-difTime, pms = {
                        hm: "000",
                        sec: "00",
                        mini: "00",
                        hour: "00",
                        day: "00",
                        month: "00",
                        year: "0"
                    };
                    if (mss > 0) {
                        pms.hm = f.haomiao(mss % 1000);
                        pms.sec = f.zero(dur % 60);
                        pms.mini = Math.floor((dur / 60)) > 0 ? f.zero(Math.floor((dur / 60)) % 60) : "00";
                        pms.hour = Math.floor((dur / 3600)) > 0 ? f.zero(Math.floor((dur / 3600)) % 24) : "00";
                        pms.day = Math.floor((dur / 86400)) > 0 ? f.zero(Math.floor((dur / 86400)) % 30) : "00";
                        //月份，以实际平均每月秒数计算
                        pms.month = Math.floor((dur / 2629744)) > 0 ? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
                        //年份，按按回归年365天5时48分46秒算
                        pms.year = Math.floor((dur / 31556926)) > 0 ? Math.floor((dur / 31556926)) : "0";
                    } else {
                        pms.year = pms.month = pms.day = pms.hour = pms.mini = pms.sec = "00";
                        pms.hm = "000";
                        //alert('结束了');
                        if (callback) {
                            callback();
                        }
                        //return ;
                    }
                    return pms;
                },
                ui: function () {
                    var pms = f.dv();
                    if (pms.hm == "000" && pms.sec == "00" && pms.mini == "00" && pms.hour == "00" && pms.day == "00" && pms.month == "00" && pms.year == "00")
                        return;
                    if (o.hm) {
                        o.hm.html(pms.hm);
                    }
                    if (o.sec) {
                        o.sec.html(pms.sec);
                    }
                    if (o.mini) {
                        o.mini.html(pms.mini);
                    }
                    if (o.hour) {
                        o.hour.html(pms.hour);
                    }
                    if (o.day) {
                        o.day.html(pms.day);
                    }
                    if (o.month) {
                        o.month.html(pms.month);
                    }
                    if (o.year) {
                        o.year.html(pms.year);
                    }
                    setTimeout(f.ui, 1);
                }
            };
            f.ui();
        });
    }
});