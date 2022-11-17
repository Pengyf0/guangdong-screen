<template>
  <div class="mid_box">
    <div>
      <dv-border-box-13>
        <div class="line_box">
          <div class="lBox">
            <MidChartMap :mapData="mapData" />
          </div>
          <div class="rBox">
            <MidBarBox :config="salesData" />
            <!-- <div class="sales_box">
              <div>
                <el-checkbox-group v-model="checkboxGroup" size="mini">
                  <el-checkbox-button
                    v-for="city in cities"
                    :label="city"
                    :disabled="city === '北京'"
                    :key="city"
                    >{{ city }}</el-checkbox-button
                  >
                </el-checkbox-group>
              </div>
              <div>
                <el-date-picker
                  size="mini"
                  type="dates"
                  v-model="pinkerValue"
                  placeholder="2022-4-21"
                  style="width: 125px"
                >
                </el-date-picker>
              </div>
            </div> -->
          </div>
        </div>
      </dv-border-box-13>
    </div>
  </div>
</template>

<script>
import MidChartMap from "@/components/echart/MidChartMap";
import MidBarBox from "@/components/echart/MidBarBox";
import IntegralMidBar from "@/components/echart/IntegralMidBar";
export default {
  props: {
    salesData: {
      type: Object,
      default: () => ({}),
    },
    MainIndicators: {
      type: Object,
      default: () => ({}),
    },
    mapData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // pinkerValue: "",
      // checkboxGroup: ["今日"],
      // cities: ["今日", "昨日", "最近7日"],
    };
  },
  components: {
    MidBarBox,
    MidChartMap,
    IntegralMidBar
  },
};
</script>

<style lang="less" scoped>
.mid_box {
  .line_box {
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    .lbox {
    }
    .rBox {
      // margin-left: 10px;
      // .sales_box {
      //   margin-top: 10px;
      //   display: flex;
      //   justify-content: space-between;
      //   div {
      //     &:first-child {
      //       margin-right: 10px;
      //     }
      //   }
      // }
      /deep/ .dv-scroll-board {
        /deep/ .rows {
          /deep/ .row-item {
            /deep/.ceil {
              /deep/ .index {
                background-color: none !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
