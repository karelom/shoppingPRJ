<template>
<!--  这里是商品列表页面的基本样式  download -->
    <div>
      <nav-header>

      </nav-header>
      <nav-bread>
        <span>Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <select v-model="userSearch" @change="selectChange">
              <option v-for="list in itemLists" :value="list.key">{{ list.item }}</option>
            </select>
            <input style="position: absolute; left: 30px; top: 230px;" v-model="userSearch">
            <span class="sortby">Sort by:</span>
            <a @click="sortDefault" href="javascript:void(0)" class="default cur">Default</a>
            <a @click="sortGoods" href="javascript:void(0)" class="price" >
              {{ priceText }} <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="setDefault">All</a></dd>
                <dd v-for="(price,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodsList">
                    <div class="pic">
                      <a href="/"><img v-bind:src=item.image alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.name}}</div>
                      <div class="price">€{{item.regularPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">Add to chat</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import './../assets/css/login.css'
  import  NavHeader from '@/components/Header.vue'
  import  NavFooter from '@/components/NavFooter.vue'
  import  NavBread from '@/components/NavBread.vue'
  import axios from 'axios'
    export default {
        name: "GoodsList.vue",
      data(){
          return{
            userSearch: "abcat0204000",
            itemLists: [
              { item: 'Headphone', key:'abcat0204000' },
              { item: 'Digital Cameras', key: 'abcat0401000' },
              { item: 'All Cell Phones with Plans', key: 'pcmcat209400050001' },
              { item: 'Laptops', key: 'abcat0502000' },
              { item: 'TVs', key: 'abcat0101000' },
              { item: 'Health, Fitness & Beauty', key: 'pcmcat242800050021' }
            ],
            goodsList:[],
            priceText: 'Price',
            sortFlag:true,
            // page:1,
            // pageSize:8,
            priceFilter:[
              {
                startPrice:'0.00',
                endPrice:'50.00'
              },
              {
                startPrice:'50.00',
                endPrice:'100.00'
              },
              {
                startPrice:'100.00',
                endPrice:'200.00'
              },
              {
                startPrice:'200.00',
                endPrice:'500.00'
              },
              {
                startPrice:'500.00 up'
              }
            ],
            priceChecked:'all',
            filterBy:false,
            overLayFlag:false
          }
      },
      components:{
          NavHeader,    //单独写表示key和value一样
          NavFooter,
          NavBread
      },
      mounted: function () {
        this.getGoodsList()
      },
      methods:{
        selectChange() {
          this.getGoodsList()
          this.priceText = 'Price'
          this.priceChecked = 'all'
        },
        getGoodsList() {
          axios.get("https://api.bestbuy.com/v1/products((categoryPath.id=" + this.userSearch + "))?apiKey=3zeu5z2as68z4r8d8gbscs2w&pageSize=50&format=json").then((result)=>{
            let res = result.data
            this.goodsList = res.products
            if (this.goodsList.length == 0) {
              console.log("Oops! There is nothing to display.")
            }
          })
        },
        showFilterPop() {
          this.filterBy=true
          this.overLayFlag=true
        },
        closePop() {
          this.filterBy=false
          this.overLayFlag=false
        },
        setDefault() {
          this.getGoodsList()
          this.priceText='Price'
          this.priceChecked = 'all'
        },
        setPriceFilter(index) {
          this.priceChecked = index
          this.closePop()
          // this.getGoodsList();
            switch (this.priceChecked) {
              case 0:
                // console.log("执行了");
                axios.get("https://api.bestbuy.com/v1/products(salePrice<=50&(categoryPath.id=" + this.userSearch + "))?apiKey=3zeu5z2as68z4r8d8gbscs2w&pageSize=16&format=json").then((result)=>{
                  let res = result.data;
                  this.goodsList = res.products;
                  if (this.goodsList.length == 0) {
                    console.log("Oops! There is nothing to display.")
                  }
                })
                this.priceText='Price'
                break;
              case 1:
                axios.get("https://api.bestbuy.com/v1/products(salePrice>50&salePrice<=100&(categoryPath.id=" + this.userSearch + "))?apiKey=3zeu5z2as68z4r8d8gbscs2w&pageSize=16&format=json").then((result)=>{
                  let res = result.data;
                  this.goodsList = res.products;
                  if (this.goodsList.length == 0) {
                    console.log("Oops! There is nothing to display.")
                  }
                })
                this.priceText='Price'
                break;
              case 2:
                axios.get("https://api.bestbuy.com/v1/products(salePrice>100&salePrice<=200&(categoryPath.id=" + this.userSearch + "))?apiKey=3zeu5z2as68z4r8d8gbscs2w&pageSize=16&format=json").then((result)=>{
                  let res = result.data;
                  this.goodsList = res.products;
                  if (this.goodsList.length == 0) {
                    console.log("Oops! There is nothing to display.")
                  }
                })
                this.priceText='Price'
                break;
              case 3:
                axios.get("https://api.bestbuy.com/v1/products(salePrice>200&salePrice<=500&(categoryPath.id=" + this.userSearch + "))?apiKey=3zeu5z2as68z4r8d8gbscs2w&pageSize=16&format=json").then((result)=>{
                  let res = result.data;
                  this.goodsList = res.products;
                  if (this.goodsList.length == 0) {
                    console.log("Oops! There is nothing to display.")
                  }
                })
                this.priceText='Price'
                break;
              case 4:
                axios.get("https://api.bestbuy.com/v1/products(salePrice>500&(categoryPath.id=" + this.userSearch + "))?apiKey=3zeu5z2as68z4r8d8gbscs2w&pageSize=16&format=json").then((result)=>{
                  let res = result.data;
                  this.goodsList = res.products;
                  if (this.goodsList.length == 0) {
                    console.log("Oops! There is nothing to display.")
                  }
                })
                this.priceText='Price'
                break;
              default:
                break;
            }
          },
        sortDefault() {
          this.getGoodsList()
          this.priceText='Price'
        },
        sortGoods() {
          // console.log(this.sortFlag);
          // 利用js中的sort方法
          if (this.sortFlag) {
            this.goodsList.sort((a,b) => { return a.regularPrice-b.regularPrice })
            this.priceText='Price:ASC'
          }
          if (!this.sortFlag) {
            this.goodsList.sort((a,b) => { return b.regularPrice-a.regularPrice })
            this.priceText='Price:DES'
          }
          this.sortFlag = !this.sortFlag
          // console.log(this.sortFlag);
        }
      }
    }
</script>

<style scoped>

</style>
