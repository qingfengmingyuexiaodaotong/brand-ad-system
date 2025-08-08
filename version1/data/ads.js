// 广告列表静态数据
const adsData = [
    {
        id: 1,
        brandName: "耐克运动",
        brandIndustry: "运动服饰",
        adTitle: "春季新品上市",
        adContent: "全新运动装备，助你突破极限",
        adType: "图片",
        activity: "是",
        deviceType: "iOS",
        position: "信息流",
        status: "在线",
        onlineTime: "2024-01-15 10:30:00 至 2024-03-15 23:59:59",
        exposureControl: "5次/天/用户",
        peerControl: "3个广告位",
        region: "全国",
        priority: 1,
        jumpLink: "https://www.nike.com/spring2024",
        material: "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Nike+Ad",
        createTime: "2024-01-15 10:30:00"
    },
    {
        id: 2,
        brandName: "苹果科技",
        brandIndustry: "科技数码",
        adTitle: "iPhone 15 Pro",
        adContent: "钛金属设计，专业摄影体验",
        adType: "视频",
        activity: "否",
        deviceType: "Android",
        position: "开屏广告",
        status: "在线",
        onlineTime: "2024-01-10 14:20:00 至 2024-02-10 23:59:59",
        exposureControl: "8次/天/用户",
        peerControl: "5个广告位",
        region: "一线城市",
        priority: 2,
        jumpLink: "https://www.apple.com/iphone-15-pro",
        material: "https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=iPhone+Video",
        createTime: "2024-01-10 14:20:00"
    },
    {
        id: 3,
        brandName: "星巴克咖啡",
        brandIndustry: "餐饮服务",
        adTitle: "春季特饮",
        adContent: "樱花季限定，春日美好时光",
        adType: "图片",
        activity: "是",
        deviceType: "H5",
        position: "详情页",
        status: "下线",
        onlineTime: "2024-01-05 09:15:00 至 2024-02-05 23:59:59",
        exposureControl: "10次/天/用户",
        peerControl: "不限",
        region: "全国",
        priority: 3,
        jumpLink: "https://www.starbucks.com/spring2024",
        material: "https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Starbucks+Ad",
        createTime: "2024-01-05 09:15:00"
    },
    {
        id: 4,
        brandName: "特斯拉汽车",
        brandIndustry: "汽车制造",
        adTitle: "Model Y 优惠",
        adContent: "限时优惠，智能驾驶新体验",
        adType: "视频",
        activity: "是",
        deviceType: "不限",
        position: "信息流",
        status: "在线",
        onlineTime: "2024-01-20 16:45:00 至 2024-04-20 23:59:59",
        exposureControl: "不限",
        peerControl: "10个广告位",
        region: "全国",
        priority: 1,
        jumpLink: "https://www.tesla.com/model-y",
        material: "https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=Tesla+Video",
        createTime: "2024-01-20 16:45:00"
    },
    {
        id: 5,
        brandName: "小米科技",
        brandIndustry: "科技数码",
        adTitle: "小米14系列",
        adContent: "徕卡光学，专业影像体验",
        adType: "图片",
        activity: "否",
        deviceType: "iOS",
        position: "开屏广告",
        status: "在线",
        onlineTime: "2024-01-12 11:30:00 至 2024-03-12 23:59:59",
        exposureControl: "3次/天/用户",
        peerControl: "3个广告位",
        region: "全国",
        priority: 2,
        jumpLink: "https://www.mi.com/mi14",
        material: "https://via.placeholder.com/300x200/FFEAA7/FFFFFF?text=Xiaomi+Ad",
        createTime: "2024-01-12 11:30:00"
    }
];

// 广告类型选项
const adTypes = ["图片", "视频"];

// 活动选项
const activityOptions = ["是", "否"];

// 设备类型选项
const deviceTypes = ["iOS", "Android", "H5", "不限"];

// 广告位置选项
const adPositions = ["信息流", "详情页", "开屏广告", "横幅广告"];

// 曝光频控选项
const adExposureControls = [
    "5次/天/用户",
    "8次/天/用户", 
    "10次/天/用户",
    "不限"
];

// 同行频控选项
const peerControls = [
    "3个广告位",
    "5个广告位", 
    "10个广告位",
    "不限"
];

// 优先级选项
const priorities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 