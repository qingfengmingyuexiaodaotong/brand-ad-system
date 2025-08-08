// 品牌列表静态数据
const brandsData = [
    {
        id: 1,
        name: "耐克运动",
        industry: "运动服饰",
        status: "可用",
        createTime: "2024-01-15 10:30:00",
        logo: "https://via.placeholder.com/100x100/FF6B6B/FFFFFF?text=Nike",
        exposureControl: "3次/天/用户",
        description: "全球知名运动品牌"
    },
    {
        id: 2,
        name: "苹果科技",
        industry: "科技数码",
        status: "可用",
        createTime: "2024-01-10 14:20:00",
        logo: "https://via.placeholder.com/100x100/4ECDC4/FFFFFF?text=Apple",
        exposureControl: "5次/天/用户",
        description: "创新科技产品制造商"
    },
    {
        id: 3,
        name: "星巴克咖啡",
        industry: "餐饮服务",
        status: "停用",
        createTime: "2024-01-05 09:15:00",
        logo: "https://via.placeholder.com/100x100/45B7D1/FFFFFF?text=Starbucks",
        exposureControl: "1次/天/用户",
        description: "全球连锁咖啡品牌"
    },
    {
        id: 4,
        name: "特斯拉汽车",
        industry: "汽车制造",
        status: "可用",
        createTime: "2024-01-20 16:45:00",
        logo: "https://via.placeholder.com/100x100/96CEB4/FFFFFF?text=Tesla",
        exposureControl: "10次/天/用户",
        description: "电动汽车制造商"
    },
    {
        id: 5,
        name: "小米科技",
        industry: "科技数码",
        status: "可用",
        createTime: "2024-01-12 11:30:00",
        logo: "https://via.placeholder.com/100x100/FFEAA7/FFFFFF?text=Xiaomi",
        exposureControl: "不限",
        description: "智能硬件和电子产品"
    }
];

// 行业列表
const industries = [
    "运动服饰",
    "科技数码", 
    "餐饮服务",
    "汽车制造",
    "美妆护肤",
    "家居用品",
    "金融服务",
    "教育培训"
];

// 曝光频控选项
const exposureControls = [
    "1次/天/用户",
    "3次/天/用户", 
    "5次/天/用户",
    "10次/天/用户",
    "不限"
]; 