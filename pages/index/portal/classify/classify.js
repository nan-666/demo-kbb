// pages/index/portal/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateItems: [
      {
        cate_id: 1,
        cate_name: "家电维修",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '修空调',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/air1.png"
          },
          {
            child_id: 2,
            name: '空调移机',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/air2.png"
          },
          {
            child_id: 3,
            name: '空调加氧',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/air3.png"
          },
          {
            child_id: 4,
            name: '修冰箱',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/refrigerator.png"
          },
          {
            child_id: 5,
            name: '修洗衣机',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/washer.png"
          },
          {
            child_id: 6,
            name: '修热水器',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/calorifier.png"
          },
          {
            child_id: 7,
            name: '修燃气灶',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/gas.png"
          },
          {
            child_id: 8,
            name: '修电脑',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/computer.png"
          }
        ]
      },
      {
        cate_id: 2,
        cate_name: "家电清洗",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '油烟机',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/rangehood.png"
          },
          {
            child_id: 2,
            name: '空调',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/air1.png"
          },
          {
            child_id: 3,
            name: '洗衣机',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/washer.png"
          },
          {
            child_id: 4,
            name: '冰箱',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/refrigerator.png"
          },
          {
            child_id: 5,
            name: '燃气灶',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/gas.png"
          },
          {
            child_id: 6,
            name: '热水器',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/calorifier.png"
          }
        ]
      },
      {
        cate_id: 3,
        cate_name: "上门安装",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '家具',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/furnisher.png"
          },
          {
            child_id: 2,
            name: '灯具',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/lamp.png"
          },
          {
            child_id: 3,
            name: '洁具',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/calorifier.png"
          },
          {
            child_id: 4,
            name: '地板',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/floor.png"
          },
          {
            child_id: 5,
            name: '瓷砖',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/ceramictile.png"
          },
          {
            child_id: 6,
            name: '门锁',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/lock.png"
          },
          {
            child_id: 7,
            name: '纱窗',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/window.png"
          },
        ]
      },
      {
        cate_id: 4,
        cate_name: "上门回收",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '家具',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/furnisher.png"
          },
          {
            child_id: 2,
            name: '电器',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/electrical.png"
          },
          {
            child_id: 3,
            name: '手机',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/phone2.png"
          },
          {
            child_id: 4,
            name: '塑料',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/plastics.png"
          },
          {
            child_id: 5,
            name: '纸品',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/paper.png"
          },
        ]
      },
      {
        cate_id: 5,
        cate_name: "装修",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '刷漆',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/brushe.png"
          },
          {
            child_id: 2,
            name: '改电',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/insertion.png"
          },
          {
            child_id: 3,
            name: '贴墙纸',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/paper2.png"
          },
          {
            child_id: 4,
            name: '改水',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/water2.png"
          },
          {
            child_id: 5,
            name: '翻修',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/refurbished.png"
          },
          {
            child_id: 6,
            name: '吊顶',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/suspended.png"
          },
          {
            child_id: 7,
            name: '瓷砖美缝',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/ceramictile.png"
          }
        ]
      },
      {
        cate_id: 6,
        cate_name: "管道疏通",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '厕所疏通',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/bathroom.png"
          },
          {
            child_id: 2,
            name: '厨房疏通',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/kitchen.png"
          },
          {
            child_id: 3,
            name: '管道疏通',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/pipeline.png"
          }
        ]
      },
      {
        cate_id: 7,
        cate_name: "家庭保洁",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '小时工',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/clean.png"
          },
          {
            child_id: 2,
            name: '擦玻璃',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/glass.png"
          },
          {
            child_id: 3,
            name: '除甲醛',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/methanal.png"
          }
        ]
      },
      {
        cate_id: 8,
        cate_name: "衣物洗护",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '羽绒服',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/jacket.png"
          },
          {
            child_id: 2,
            name: '大衣',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/coat.png"
          },
          {
            child_id: 3,
            name: '鞋',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/shoes.png"
          },
          {
            child_id: 4,
            name: '家纺',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/hometextile.png"
          },
          {
            child_id: 5,
            name: '箱包',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/bag.png"
          }
        ]
      },
      {
        cate_id: 9,
        cate_name: "拉家搬货",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '拉家',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/move.png"
          },
          {
            child_id: 2,
            name: '搬货',
            image: "http://q9xwl365p.bkt.clouddn.com/service/icon/pickup.png"
          }
        ]
      }
    ],
    curNav: 1,
    curIndex: 0
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  }
})