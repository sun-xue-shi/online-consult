<script setup lang="ts">
import { getMedicalOrderLogistics } from '@/api/order'
import type { Express, Logistics, Location } from '@/types/order'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AMapLoader from '@amap/amap-jsapi-loader'
import carIcon from '@/assets/car.png'
import endIcon from '@/assets/end.png'
import startIcon from '@/assets/start.png'

const route = useRoute()
const router = useRouter()
const express = ref<Logistics>({} as Logistics)
onMounted(async () => {
  const res = await getMedicalOrderLogistics(route.params.id as string)
  express.value = res.data
  initMap()
})

window._AMapSecurityConfig = {
  securityJsCode: '462bdfd9b1b98a008b2a19fd643a415f'
}

const initMap = async () => {
  try {
    const AMap = await AMapLoader.load({
      version: '2.0',
      key: '32ce264c59030767cd4aa108773d41c7'
    })
    // 创建地图
    const map = new AMap.Map('map', {
      zoom: 11, //地图级别
      center: [116.397428, 39.90923] //地图中心点
    })
    console.log(express.value.logisticsInfo)

    // 轨迹绘制
    if (express.value?.logisticsInfo) {
      const getMarker = (point: Location, image: string, width = 25, height = 30) => {
        const icon = new AMap.Icon({
          size: new AMap.Size(width, height),
          image,
          imageSize: new AMap.Size(width, height)
        })
        const marker = new AMap.Marker({
          position: [point.longitude, point?.latitude],
          icon: icon,
          offset: new AMap.Pixel(-width / 2, -height)
        })
        return marker
      }
      const list = [...express.value.logisticsInfo]
      console.log(list)
      const start = list.shift()
      const end = list.pop()
      const ways = list.map((item) => [item.longitude, item.latitude])

      // 自定义图标
      const startMarker = getMarker(start!, startIcon)
      map.add(startMarker)

      const endmarker = getMarker(end!, endIcon)
      map.add(endmarker)

      AMap.plugin('AMap.Driving', function () {
        const driving = new AMap.Driving({
          map,
          showTraffic: false,
          hideMarkers: true
        })
        //获取起终点规划线路
        driving.search(
          [start?.longitude, start?.latitude],
          [end?.longitude, end?.latitude],
          {
            waypoints: ways
          },
          (status: string, result: object) => {
            const curr = express.value?.currentLocationInfo
            const currMarker = getMarker(curr!, carIcon, 33, 20)
            map.add(currMarker)

            setTimeout(() => {
              map.setFitView([currMarker, endmarker])
            }, 1000)
          }
        )
      })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="order-logistics-page">
    <div id="map">
      <div class="title">
        <van-icon name="arrow-left" @click="router.back()" />
        <span>{{ express?.statusValue }}</span>
        <van-icon name="service" />
      </div>
      <div class="current">
        <p class="status">订单{{ express?.statusValue }} 预计{{ express?.estimatedTime }}送达</p>
        <p class="predict">
          <span>极兔</span>
          <span>{{ express?.awbNo }}</span>
        </p>
      </div>
    </div>
    <div class="logistics">
      <p class="title">物流详情</p>
      <van-steps direction="vertical" :active="0">
        <van-step v-for="item in express?.list" :key="item.id">
          <p class="status">{{ item.statusValue }}</p>
          <p class="content">{{ item.content }}</p>
          <p class="time">{{ item.createTime }}</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-logistics-page {
  --van-step-icon-size: 18px;
  --van-step-circle-size: 10px;
}
#map {
  height: 450px;
  background-color: var(--bg);
  overflow: hidden;
  position: relative;
  .title {
    background-color: #fff;
    height: 46px;
    width: 355px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 16px;
    position: absolute;
    left: 10px;
    top: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    z-index: 999;
    > span {
      flex: 1;
      text-align: center;
    }
    .van-icon {
      font-size: 18px;
      color: #666;
      &:last-child {
        color: var(--primary);
      }
    }
  }
  .current {
    height: 80px;
    border-radius: 4px;
    background-color: #fff;
    height: 80px;
    width: 355px;
    box-sizing: border-box;
    padding: 15px;
    position: absolute;
    left: 10px;
    bottom: 10px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    z-index: 999;
    .status {
      font-size: 15px;
      line-height: 26px;
    }
    .predict {
      color: var(--tip);
      font-size: 13px;
      margin-top: 5px;
      > span {
        padding-right: 10px;
      }
    }
  }
}
.logistics {
  padding: 0 10px 20px;
  .title {
    font-size: 16px;
    padding: 15px 5px 5px;
  }
  .van-steps {
    :deep(.van-step) {
      &::after {
        display: none;
      }
    }
    .status {
      font-size: 15px;
      color: var(--text3);
      margin-bottom: 4px;
    }
    .content {
      font-size: 13px;
      color: var(--tip);
      margin-bottom: 4px;
    }
    .time {
      font-size: 13px;
      color: var(--tag);
    }
  }
}
</style>
