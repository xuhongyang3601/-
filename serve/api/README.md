#### 初始化
+ 执行`npm install -S`补全需要的包
+ 在浏览器地址栏输入`http://localhost:3030/接口地址`访问接口

### 接口整理

#### 省份名称接口
|接口地址|返回方式|请求方式|请求示例|接口备注|
|:---|:---|:---|:---|:---|
|/api/regionpname|json|GET|http://localhost:3030/api/regionpname|返回省份名称|
##### 请求参数说明
|名称|必填|类型|说明|
|:---|:---|:---|:---|
|/|/|/|/|
##### 返回参数说明
|名称|类型|说明|
|:---|:---|:---|
|code|int|状态码|
|msg|string|返回码描述|
|pname|省份名|
##### JSON返回示例
```json
{
    "code": 200,
    "msg": "请求成功",
    "data": {
        "pname": [
            "湖北",
            "广东",
            "香港",
            "浙江",
            "河南",
            "湖南",
            "安徽",
            "黑龙江",
            "上海",
            "江西",
            "北京",
            "新疆",
            "山东",
            "四川",
            "江苏",
            "重庆",
            "福建",
            "台湾",
            "陕西",
            "河北",
            "辽宁",
            "内蒙古",
            "广西",
            "天津",
            "山西",
            "云南",
            "海南",
            "甘肃",
            "吉林",
            "贵州",
            "宁夏",
            "西藏",
            "澳门",
            "青海"
        ]
    }
}
```

#### 城市名称接口
|接口地址|返回方式|请求方式|请求示例|接口备注|
|:---|:---|:---|:---|:---|
|/api/regioncname|json|GET|http://localhost:3030/api/regioncname|返回城市名称|
##### 请求参数说明
|名称|必填|类型|说明|
|:---|:---|:---|:---|
|pname|是|string|省份名|
##### 返回参数说明
|名称|类型|说明|
|:---|:---|:---|
|code|int|状态码|
|msg|string|返回码描述|
|cname|string|城市名
##### 接口返回示例
```json
{
    "code": 200,
    "msg": "请求成功",
    "data": [
        {
            "cname": "宜昌"
        },
        {
            "cname": "黄石"
        },
        {
            "cname": "黄冈"
        },
        {
            "cname": "荆州"
        },
        {
            "cname": "孝感"
        },
        {
            "cname": "随州"
        },
        {
            "cname": "鄂州"
        },
        {
            "cname": "武汉"
        },
        {
            "cname": "襄阳"
        },
        {
            "cname": "咸宁"
        },
        {
            "cname": "荆门"
        },
        {
            "cname": "潜江"
        },
        {
            "cname": "境外输入人员"
        },
        {
            "cname": "境外输入"
        },
        {
            "cname": "神农架"
        },
        {
            "cname": "恩施州"
        },
        {
            "cname": "仙桃"
        },
        {
            "cname": "天门"
        },
        {
            "cname": "十堰"
        },
        {
            "cname": "未明确地区"
        },
        {
            "cname": "神农架林区"
        },
        {
            "cname": "监狱系统"
        }
    ]
}
```
#### 动态列表接口
|接口地址|返回方式|请求方式|请求示例|接口备注|
|:---|:---|:---|:---|:---|
|/api/dynamics|json|GET|/api/dynamics|返回所有动态列表|
##### 请求参数说明
|名称|必填|类型|说明|
|:---|:---|:---|:---|
|did|是|int|动态编号|
|page|是|int|当前的文章页码|
##### 返回参数说明
|名称|类型|说明|
|:---|:---|:---|
|message|string|返回码描述|
|code|int|状态码|
|did|int|动态id|
|dtext|string|动态文本|
|likeCount|int|该条动态被点赞的次数|
| pageCount |int| 当前数据库中的总页数 |
##### 接口返回示例
```json
{
  "message": "请求成功",
  "code": 200,
  "result": [
    {
      "did": 1,
      "dtext": "今日疫情防护打卡",
      "dimg": "img/dynamic/1.jpg",
      "likeCount": 0
    },
    {
      "did": 2,
      "dtext": "2020年伊始，一场突如其来的新型冠状病毒肺炎疫情，打乱了人们的日常生活。在抗击疫情的日子里，有无奈、担心、焦虑，但也有很多闪闪的微光，鼓舞着大家众志成城，战胜疫情。",
      "dimg": "\\upload\\2020-10-02\\31b742a0-0484-11eb-bf44-49b4ffe85515.jpg",
      "likeCount": 2
    },
    {
      "did": 3,
      "dtext": "一方有难，八方支援，在一线的“战士们“，在后方的支援者，他们每一段故事都生动都感人，秋天已经到来，我们正向前迈进，致敬最美的逆行者，致敬每一位支援者",
      "dimg": "\\upload\\2020-10-02\\21122c60-0486-11eb-bf44-49b4ffe85515.jpg",
      "likeCount": 1
    },
    {
      "did": 4,
      "dtext": "疫情虽然可怕、大家都能做好四合理、提前预防、最主要的是个人卫生很重",
      "dimg": "\\upload\\2020-10-02\\69d9c3e0-0486-11eb-bf44-49b4ffe85515.jpg",
      "likeCount": 0
    },
    {
      "did": 5,
      "dtext": "等疫情结束了，我要抹最美的粉黛，穿最舒适的衣裳，去见找“许久未见”的朋友们，我们继续大步向前走！加油！",
      "dimg": "\\upload\\2020-10-02\\967b64d0-0486-11eb-bf44-49b4ffe85515.jpg",
      "likeCount": 0
    }
  ],
  "pageCount": 5
}
```
#### 注册接口
|接口地址|返回方式|请求方式|请求示例|接口备注|
|:---|:---|:---|:---|:---|
|/api/register|json|POST|http://localhost:3030/api/register|注册接口|
##### 请求参数说明
|名称|必填|类型|说明|
|:---|:---|:---|:---|
|uname|是|string|用户名|
|upwd|是|string|用户密码|
|uphone|否|number|用户电话|
|uaddress|否|string|用户住址|
##### 返回参数说明
|名称|类型|说明|
|:---|:---|:---|
|code|int|状态码|
|msg|string|返回码描述|
##### 接口返回示例
```json
{
    "code": 200,
    "msg": "注册成功"
}
```
#### 登录接口
|接口地址|返回方式|请求方式|请求示例|接口备注|
|:---|:---|:---|:---|:---|
|/api/login|json|POST|http://localhost:3030/api/login|登录接口|
##### 请求参数说明
|名称|必填|类型|说明|
|:---|:---|:---|:---|
|uname|是|string|用户名|
|upwd|是|string|用户密码|
##### 返回参数说明
|名称|类型|说明|
|:---|:---|:---|
|code|int|状态码|
|msg|string|返回码描述|
|token|string|用户token|
##### 接口返回示例
```json
{
    "code":200,
    "msg": "登录成功",
    "token": "sajheuhduieabcnauiw6d78yqeye73983u89u3y78wt78dg8q"
}
```
#### 个人中心接口
|接口地址|返回方式|请求方式|请求示例|接口备注|
|:---|:---|:---|:---|:---|
|/api/user|json|GET|http://localhost:3030/api/user|个人中心接口|
##### 请求参数说明
|名称|必填|类型|说明|
|:---|:---|:---|:---|
|uid|是|number|用户id|
##### 返回参数说明
|名称|类型|说明|
|:---|:---|:---|
|code|int|状态码|
|msg|string|返回码描述|
|uid| int    | 当前用户id   |
|unick| string | 当前用户昵称 |
|uname| string | 用户账号     |
|upwd| string | 用户密码     |
|uavatar| string | 用户头像     |
|ugender| string | 用户性别     |
|uphone| string | 用户手机号   |
|uaddress| string | 用户地址     |
##### 接口返回示例
```json
{
    "code": 200,
    "msg": "请求成功",
    "data": [{
        "uid": 2,
        "unick": "注册用户",
        "uname": "ceshi1",
        "upwd": "ceshi1",
        "uavatar": "img/avatar/1.jpg",
        "ugender": "未知",
        "uphone": null,
        "uaddress": null
    }]
}
```
#### 获取用户id接口

| 接口地址     | 返回方式 | 请求方式 | 请求示例                          | 接口备注       |
| :----------- | :------- | :------- | :-------------------------------- | :------------- |
| /api/isLogin | json     | GET      | http://localhost:3030/api/isLogin | 获取用户id接口 |

##### 请求参数说明

| 名称  | 必填 | 类型   | 说明     |
| :---- | :--- | :----- | :------- |
| uname | 是   | string | 用户账号 |

##### 返回参数说明

| 名称 | 类型   | 说明       |
| :--- | :----- | :--------- |
| code | int    | 状态码     |
| msg  | string | 返回码描述 |
| uid  | int    | 当前用户id |

##### 接口返回示例

```json
{
  "code": 200,
  "msg": "查询成功",
  "result": [
    {
      "uid": 2
    }
  ]
}
```

#### 首页对应城市数据接口

|接口地址|返回方式|请求方式|请求示例|接口备注|
|:---|:---|:---|:---|:---|
|/api/indexData|json|GET|http://localhost:3030/api/indexData|返回对应城市的数据|
##### 请求参数说明
|名称|必填|类型|说明|
|:---|:---|:---|:---|
|cname|是|/string|用户选择的城市名|
##### 返回参数说明
|名称|类型|说明|
|:---|:---|:---|
|code|int|状态码|
|msg|string|返回码描述|
|pname|string|当前用户选择的省份|
|cname|string|当前用户选择的城市|
|confirm|int|当前城市的确诊人数|
|suspect|int|当前城市的疑似病例|
|heal|int|当前城市的治愈人数|
|dead|int|当前城市的死亡人数|
##### JSON返回示例
```json
{
    "code": 200,
    "msg": "请求成功",
    "data": [
        {
            "pname": "湖北",
            "cname": "武汉",
            "confirm": 50340,
            "suspect": 0,
            "heal": 46471,
            "dead": 3869
        }
    ]
}
```

#### 首页折线图
|接口地址|返回方式|请求方式|请求示例|接口备注|
|:---|:---|:---|:---|:---|
|/api/total|json|GET|http://localhost:3030/api/total|返回当前七天的数据|
##### 请求参数说明
|名称|必填|类型|说明|
|:---|:---|:---|:---|
|/|/|/|/|
##### 返回参数说明
|名称|类型|说明|
|:---|:---|:---|
|code|int|状态码|
|msg|string|返回码描述|
|insert_date|string|当前数据的更新时间|
|confirm|int|当天全国确诊人数|
|suspect|int|当天全国疑似病例|
|heal|int|当天全国治愈人数|
|dead|int|当天全国死亡人数|
|input|int|当天境外输入人数|
##### JSON返回示例
```json
{
    "code": 200,
    "msg": "请求成功",
    "data": [
        {
            "insert_date": "2020-09-12",
            "confirm": 90666,
            "suspect": 0,
            "heal": 85533,
            "dead": 4741,
            "input": 2635
        },
        {
            "insert_date": "2020-09-11",
            "confirm": 90643,
            "suspect": 0,
            "heal": 85505,
            "dead": 4740,
            "input": 2625
        },
        {
            "insert_date": "2020-09-10",
            "confirm": 90623,
            "suspect": 0,
            "heal": 85480,
            "dead": 4740,
            "input": 2619
        },
        {
            "insert_date": "2020-09-09",
            "confirm": 90595,
            "suspect": 0,
            "heal": 85436,
            "dead": 4740,
            "input": 2604
        },
        {
            "insert_date": "2020-09-08",
            "confirm": 90582,
            "suspect": 0,
            "heal": 85411,
            "dead": 4740,
            "input": 2597
        },
        {
            "insert_date": "2020-09-07",
            "confirm": 90573,
            "suspect": 0,
            "heal": 85380,
            "dead": 4739,
            "input": 2595
        },
        {
            "insert_date": "2020-09-05",
            "confirm": 90517,
            "suspect": 0,
            "heal": 85314,
            "dead": 4735,
            "input": 2573
        }
    ]
}
```
#### 首页文章数据接口
|接口地址|返回方式|请求方式|请求示例|接口备注|
|:---|:---|:---|:---|:---|
|/api/article|json|GET|http://localhost:3030/api/article|返回文章表|
##### 请求参数说明
|名称|必填|类型|说明|
|:---|:---|:---|:---|
|page|是|int|当前页码数|
##### 返回参数说明
|名称|类型|说明|
|:---|:---|:---|
|code|int|状态码|
|msg|string|返回码描述|
|aid|int|当前文章id|
|asubject|string|当前文章标题|
|aimg|string|当前文章封面图片|
|aconment|string|当前文章详情|
|atime|int|当前文章发布时间|
|aimport|string|当前文章是否置顶|
|type|string|当前文章类型|
|pageCount|int|数据库中文章的总页数|
##### JSON返回示例
```json
{
  "code": 200,
  "msg": "请求成功",
  "data": [
    {
      "aid": 3,
      "asubject": "偷渡、闯战区、无视大使馆苦劝 南京大学生染上新冠",
      "aimg": "http://cms-bucket.ws.126.net/2020/0916/166acd81j00qgrbwl00cnc0009c0070c.jpg?imageView&thumbnail=140y88&quality=85",
      "aconment": "https://dy.163.com/article/FMMBLQP90545LTOD.html",
      "atime": "2020-09-16T16:00:00.000Z",
      "aimport": "1",
      "type": "文章"
    },
    {
      "aid": 4,
      "asubject": "疫情是中国的“切尔诺贝利时刻”？专家：是西方的",
      "aimg": "http://cms-bucket.ws.126.net/2020/1001/87255bdaj00qhi0za008qc000s600e3c.jpg?imageView&thumbnail=140y88&quality=85",
      "aconment": "https://dy.163.com/article/FNRATL2S051481US.html",
      "atime": "2020-09-30T16:00:00.000Z",
      "aimport": "1",
      "type": "文章"
    },
    {
      "aid": 5,
      "asubject": "部分新冠重症可能与基因突变等因素有关",
      "aimg": "http://cms-bucket.ws.126.net/2020/0929/f959a174p00qhe9lu0054c0009c0070c.png?imageView&thumbnail=140y88&quality=85",
      "aconment": "https://jiankang.163.com/20/0929/08/FNM8UU3Q00388045.html",
      "atime": "2020-09-28T16:00:00.000Z",
      "aimport": "1",
      "type": "文章"
    },
    {
      "aid": 6,
      "asubject": "重磅！UBC教授研发抗新冠药物 重症服后病毒2天消失",
      "aimg": "http://cms-bucket.ws.126.net/2020/0928/9cd41fe8j00qhcbx9000vc000s600e3c.jpg?imageView&thumbnail=140y88&quality=85",
      "aconment": "https://dy.163.com/article/FNISUF5V0539AT47.html",
      "atime": "2020-09-27T16:00:00.000Z",
      "aimport": "1",
      "type": "文章"
    },
    {
      "aid": 7,
      "asubject": "疫情之下 上千中国人飞往这座柬埔寨边境的罪恶之城",
      "aimg": "http://cms-bucket.ws.126.net/2020/0925/01a89429j00qh6xj700a4c000s600e3c.jpg?imageView&thumbnail=140y88&quality=85",
      "aconment": "https://dy.163.com/article/FN85ROR70512856T.html",
      "atime": "2020-09-24T16:00:00.000Z",
      "aimport": "1",
      "type": "文章"
    },
    {
      "aid": 8,
      "asubject": "不听大使馆劝执意去非洲的驴友:新冠出院后继续出国",
      "aimg": "http://cms-bucket.ws.126.net/2020/0923/021b7510j00qh3927002ec0009c0070c.jpg?imageView&thumbnail=140y88&quality=85",
      "aconment": "https://dy.163.com/article/FN6NT0EE051481US.html",
      "atime": "2020-09-23T16:00:00.000Z",
      "aimport": "1",
      "type": "文章"
    },
    {
      "aid": 9,
      "asubject": "日增4千!英国新冠升起4级警报 民众又疯狂抢起厕纸",
      "aimg": "http://cms-bucket.ws.126.net/2020/0923/922e6937j00qh37r4004xc000s600e3c.jpg?imageView&thumbnail=140y88&quality=85",
      "aconment": "https://dy.163.com/article/FN5QI75U051484S5.html",
      "atime": "2020-09-22T16:00:00.000Z",
      "aimport": "1",
      "type": "文章"
    },
    {
      "aid": 10,
      "asubject": "张文宏最新判断:疫情第二波是必然 至少做一年打算",
      "aimg": "http://cms-bucket.ws.126.net/2020/0920/0e5266faj00qgykkt0012c000s600e3c.jpg?imageView&thumbnail=140y88&quality=85",
      "aconment": "https://dy.163.com/article/FN01QREP055040N3.html",
      "atime": "2020-09-20T16:00:00.000Z",
      "aimport": "1",
      "type": "文章"
    },
    {
      "aid": 11,
      "asubject": "疫情下的纽约切尔西市场 客流量明显下降",
      "aimg": "http://cms-bucket.ws.126.net/2020/0918/e2969af6j00qgul6y0032c000s600e3c.jpg?imageView&thumbnail=140y88&quality=85",
      "aconment": "https://travel.163.com/20/0920/00/FMU5UUJA00068AIR.html",
      "atime": "2020-09-19T16:00:00.000Z",
      "aimport": "1",
      "type": "文章"
    },
    {
      "aid": 12,
      "asubject": "花花口罩：疫情下的法国全民标配",
      "aimg": "http://cms-bucket.ws.126.net/2020/0917/b29110dcj00qgt5kw002ic000s600e3c.jpg?imageView&thumbnail=140y88&quality=85",
      "aconment": "https://travel.163.com/20/0918/00/FMP17HCS00068AIR.html",
      "atime": "2020-09-17T16:00:00.000Z",
      "aimport": "1",
      "type": "文章"
    }
  ],
  "pageCount": 4
}
```
### 文章内页接口,可直接使用/api/article

#### 获取用户是否点赞接口

| 接口地址       | 返回方式 | 请求方式 | 请求示例                            | 接口备注         |
| :------------- | :------- | :------- | :---------------------------------- | :--------------- |
| /api/likeState | json     | GET      | http://localhost:3030/api/likeState | 获取用户是否点赞 |

##### 请求参数说明

| 名称 | 必填 | 类型 | 说明         |
| :--- | :--- | :--- | :----------- |
| uid  | 是   | int  | 当前用户的id |

##### 返回参数说明

| 名称 | 类型 | 说明                   |
| :--- | :--- | :--------------------- |
| did  | int  | 该用户点赞过的动态的id |

##### 接口返回示例

```json
[
  {
    "did": 2
  },
  {
    "did": 3
  }
]
```

#### 用户点赞时插入点赞表的接口

| 接口地址  | 返回方式 | 请求方式 | 请求示例                       | 接口备注                   |
| :-------- | :------- | :------- | :----------------------------- | :------------------------- |
| /api/like | json     | POST     | http://localhost:3030/api/like | 用户点赞时插入点赞表的接口 |

##### 请求参数说明

| 名称 | 必填 | 类型 | 说明               |
| :--- | :--- | :--- | :----------------- |
| uid  | 是   | int  | 当前点赞用户的id   |
| did  | 是   | int  | 当前点赞的动态的id |

##### 返回参数说明

| 名称 | 类型   | 说明         |
| :--- | :----- | :----------- |
| code | int    | 返回的状态码 |
| msg  | string | 状态码的描述 |

##### 接口返回示例

```json
{
    "code":200,
    "msg": "登录成功"
}
```

#### 用户点赞时插入动态表的接口

| 接口地址   | 返回方式 | 请求方式 | 请求示例                        | 接口备注                   |
| :--------- | :------- | :------- | :------------------------------ | :------------------------- |
| /api/dlike | json     | GET      | http://localhost:3030/api/dlike | 用户点赞时插入动态表的接口 |

##### 请求参数说明

| 名称      | 必填 | 类型 | 说明               |
| :-------- | :--- | :--- | :----------------- |
| did       | 是   | int  | 当前点赞的动态的id |
| likeCount | 是   | int  | 当前动态的点赞数量 |

##### 返回参数说明

| 名称   | 类型   | 说明                   |
| :----- | :----- | :--------------------- |
| code   | int    | 返回的状态码           |
| msg    | string | 状态码的描述           |
| result | int    | 该条动态点赞后的点赞数 |

##### 接口返回示例

```json
{
  "code": 200,
  "msg": "修改成功",
  "result": 6
}
```

#### 修改用户信息的接口

| 接口地址    | 返回方式 | 请求方式 | 请求示例                         | 接口备注           |
| :---------- | :------- | :------- | :------------------------------- | :----------------- |
| /api/modify | json     | POST     | http://localhost:3030/api/modify | 修改用户信息的接口 |

##### 请求参数说明

| 名称 | 必填 | 类型   | 说明           |
| :--- | :--- | :----- | :------------- |
| uid  | 是   | int    | 当前用户的id   |
| msg  | 是   | string | 当前修改的内容 |

##### 返回参数说明

| 名称 | 类型   | 说明         |
| :--- | :----- | :----------- |
| code | int    | 返回的状态码 |
| msg  | string | 状态码的描述 |

##### 接口返回示例

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

#### 修改用户头像的接口

| 接口地址    | 返回方式 | 请求方式 | 请求示例                         | 接口备注           |
| :---------- | :------- | :------- | :------------------------------- | :----------------- |
| /api/avatar | json     | POST     | http://localhost:3030/api/modify | 修改用户头像的接口 |

##### 请求参数说明

| 名称 | 必填 | 类型   | 说明           |
| :--- | :--- | :----- | :------------- |
| uid  | 是   | int    | 当前用户的id   |
| dimg | 是   | string | 当前图片的内容 |

##### 返回参数说明

| 名称 | 类型   | 说明         |
| :--- | :----- | :----------- |
| code | int    | 返回的状态码 |
| msg  | string | 状态码的描述 |

##### 接口返回示例

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

#### 