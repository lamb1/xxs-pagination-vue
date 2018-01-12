(function (vue) {
    var template = '<div class="page-bar"> \
                    <select class="page-select" v-model="selected" @change="changeSelect()">\
                        <option v-for="item in defaultPerPageOptions" v-bind:value="item.id">{{item.name}}</option>\
                    </select>\
                     <ul class="page-list"> \
                       <li><a class="prev" :class="setButtonClass(0)" v-on:click="prvePage()">上一页</a></li> \
                       <li v-for="index in indexs"  v-bind:class="{ active: cur == index }"> \
                          <a v-on:click="btnClick(index)">{{ index < 1 ? "..." : index }}</a> \
                       </li> \
                       <li><a class="next" :class="setButtonClass(1)" v-on:click="nextPage()">下一页</a></li> \
                     </ul> \
                   </div>'

    var pagination = vue.extend({
        template: template,
        props: ['cur',   'count', 'defaultPerPageOptions', 'selected'],
        //       当前页数，总数，    所有每页可以选数量，       当前每页数据
        data: { pageCount: 1},//默认页数
        computed: {
            indexs: function () {
                this.defaultPerPageOptions = [
                    {id: 10, name: '每页10条'},
                    {id: 20, name: '每页20条'},
                    {id: 30, name: '每页30条'},
                    {id: 40, name: '每页40条'},
                    {id: 50, name: '每页50条'},
                    {id: 60, name: '每页60条'},
                    {id: 70, name: '每页70条'},
                    {id: 80, name: '每页80条'},
                    {id: 90, name: '每页90条'},
                    {id: 100, name: '每页100条'}
                ];
                if (!this.selected) {
                    this.selected = 10;//默认每页10条
                } else {
                    this.selected = parseInt(this.selected, 10);
                }
                return this.getPagination();
            }
        },
        methods: {
            getPagination: function () {
                var _this = this;
                _this.selected = parseInt(_this.selected, 10);
                var pageList = [];
                if (_this.cur) {
                    _this.cur = parseInt(_this.cur, 10);
                } else {
                    _this.cur = 1;
                }
                if (_this.count) {
                    _this.count = parseInt(_this.count, 10);
                } else {
                    _this.count = 0;
                    return
                }
                var page = Math.ceil(_this.count / _this.selected);
                this.pageCount = page;
                // 如果分页总数>0，并且当前页大于分页总数
                if (page > 0 && _this.cur > _this.selected) {
                    _this.cur = page;
                }
                if (page <= 9) {
                    for (var i = 1; i < page + 1; i++) {
                        pageList.push(i);
                    }
                    return pageList
                }
                if (_this.cur >= 5) {
                    if (_this.cur + 2 >= page - 1) {
                        for (var i = 1; i < 3; i++) {
                            pageList.push(i);
                        }
                    } else {
                        for (var i = _this.cur - 3; i < _this.cur + 2; i++) {
                            pageList.push(i);
                        }
                    }
                } else {
                    for (var i = 1; i < 6; i++) {
                        pageList.push(i);
                    }
                }
                if (page >= 9) {
                    pageList.push('...');
                    if (_this.cur + 2 >= page - 1) {
                        for (var f = page - 4; f <= page; f++) {
                            pageList.push(f);
                        }
                    } else {
                        for (var f = page - 1; f <= page; f++) {
                            pageList.push(f);
                        }
                    }
                }
                return pageList
            },
            btnClick: function (data) {
                if (data == '...') {
                    return;
                } else {
                    this.cur = data;
                    this.getPagination();
                }
            },
            nextPage: function () {
                this.btnClick(this.cur + 1);
            },
            prvePage: function () {
                if (this.cur <= 1) return;
                this.btnClick(this.cur - 1);
            },
            setButtonClass: function (isNextButton) {
                if (isNextButton) {
                    return this.cur >= this.pageCount ? "page-button-disabled" : ""
                }
                else {
                    return this.cur <= 1 ? "page-button-disabled" : ""
                }
            },
            changeSelect:function () {
                this.getPagination()
            }
        }
    });

    vue.Pagination = pagination;

})(Vue)