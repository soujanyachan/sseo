const axios = require('axios');
const YAML = require('yaml')
const fs = require('fs');
const _ = require('lodash')

const file = fs.readFileSync('./config.yaml', 'utf8')
const yamlConfig = YAML.parse(file)

const auth = Buffer.from(`${yamlConfig.MOZ_ACCESS_ID}:${yamlConfig.MOZ_SECRET_KEY}`).toString('base64');

const urlMetrics = async (url) => {
    let data = JSON.stringify({
        "targets": [
            url
        ],
        "distributions": true
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://lsapi.seomoz.com/v2/url_metrics-dummy',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`,
        },
        data : data
    };

    try {
        const response = {
            "results": [
                {
                    "page": "moz.com/",
                    "subdomain": "moz.com",
                    "root_domain": "moz.com",
                    "title": "Moz - SEO Software for Smarter Marketing",
                    "last_crawled": "2023-07-07",
                    "http_code": 200,
                    "pages_to_page": 15091459,
                    "nofollow_pages_to_page": 9410172,
                    "redirect_pages_to_page": 3632973,
                    "external_pages_to_page": 14721087,
                    "external_nofollow_pages_to_page": 9410172,
                    "external_redirect_pages_to_page": 3632520,
                    "deleted_pages_to_page": 2222335,
                    "root_domains_to_page": 42180,
                    "indirect_root_domains_to_page": 10589,
                    "deleted_root_domains_to_page": 6598,
                    "nofollow_root_domains_to_page": 9064,
                    "pages_to_subdomain": 97751586,
                    "nofollow_pages_to_subdomain": 16726877,
                    "redirect_pages_to_subdomain": 48006555,
                    "external_pages_to_subdomain": 68969974,
                    "external_nofollow_pages_to_subdomain": 16711067,
                    "external_redirect_pages_to_subdomain": 41530266,
                    "deleted_pages_to_subdomain": 20387941,
                    "root_domains_to_subdomain": 181337,
                    "deleted_root_domains_to_subdomain": 28420,
                    "nofollow_root_domains_to_subdomain": 38547,
                    "pages_to_root_domain": 99039650,
                    "nofollow_pages_to_root_domain": 16885468,
                    "redirect_pages_to_root_domain": 48012075,
                    "external_pages_to_root_domain": 69621198,
                    "external_indirect_pages_to_root_domain": 45106299,
                    "external_nofollow_pages_to_root_domain": 16868568,
                    "external_redirect_pages_to_root_domain": 41533663,
                    "deleted_pages_to_root_domain": 20819489,
                    "root_domains_to_root_domain": 182888,
                    "indirect_root_domains_to_root_domain": 28541,
                    "deleted_root_domains_to_root_domain": 28675,
                    "nofollow_root_domains_to_root_domain": 38654,
                    "page_authority": 74,
                    "domain_authority": 91,
                    "link_propensity": 0.009057917632,
                    "spam_score": 4,
                    "root_domains_from_page": 5,
                    "nofollow_root_domains_from_page": 0,
                    "pages_from_page": 7,
                    "nofollow_pages_from_page": 0,
                    "root_domains_from_root_domain": 71813,
                    "nofollow_root_domains_from_root_domain": 58006,
                    "pages_from_root_domain": 350610,
                    "nofollow_pages_from_root_domain": 215557,
                    "pages_crawled_from_root_domain": 7928202,
                    "root_domains_to_page_by_root_domains": [
                        1759,
                        6916,
                        10929,
                        13194,
                        7059,
                        1982,
                        299,
                        37,
                        5,
                        0
                    ],
                    "root_domains_to_root_domain_by_root_domains": [
                        8869,
                        34031,
                        49307,
                        55927,
                        28322,
                        5617,
                        735,
                        70,
                        10,
                        0
                    ],
                    "nofollow_root_domains_to_root_domain_by_root_domains": [
                        1262,
                        5868,
                        9975,
                        12891,
                        7328,
                        1190,
                        128,
                        10,
                        2,
                        0
                    ],
                    "root_domains_to_page_by_domain_authority": [
                        18885,
                        7909,
                        5696,
                        3880,
                        1970,
                        1904,
                        835,
                        496,
                        381,
                        224
                    ],
                    "root_domains_to_subdomain_by_domain_authority": [
                        86979,
                        36538,
                        24261,
                        14629,
                        6981,
                        6554,
                        2641,
                        1386,
                        904,
                        464
                    ],
                    "root_domains_to_root_domain_by_domain_authority": [
                        87948,
                        36843,
                        24408,
                        14691,
                        7011,
                        6576,
                        2650,
                        1389,
                        907,
                        465
                    ],
                    "nofollow_root_domains_to_root_domain_by_domain_authority": [
                        17442,
                        8607,
                        5445,
                        2882,
                        1483,
                        1565,
                        706,
                        263,
                        178,
                        83
                    ],
                    "pages_to_root_domain_by_spam_score": [
                        15607398,
                        7602394,
                        4197970,
                        11574574,
                        6422825,
                        5752821,
                        9106768,
                        286228,
                        499610,
                        27543
                    ],
                    "nofollow_pages_to_root_domain_by_spam_score": [
                        6870773,
                        5785314,
                        2698249,
                        271856,
                        436999,
                        114823,
                        220319,
                        29394,
                        5991,
                        576
                    ],
                    "root_domains_to_page_by_spam_score": [
                        26647,
                        4399,
                        1940,
                        1373,
                        1165,
                        739,
                        531,
                        459,
                        221,
                        53
                    ],
                    "root_domains_to_subdomain_by_spam_score": [
                        109458,
                        20167,
                        8803,
                        5712,
                        4522,
                        3248,
                        2495,
                        2016,
                        1413,
                        879
                    ],
                    "root_domains_to_root_domain_by_spam_score": [
                        110202,
                        20418,
                        8991,
                        5786,
                        4558,
                        3275,
                        2521,
                        2033,
                        1419,
                        879
                    ],
                    "nofollow_root_domains_to_root_domain_by_spam_score": [
                        22964,
                        5463,
                        2266,
                        1346,
                        931,
                        707,
                        456,
                        376,
                        176,
                        43
                    ]
                },
                {
                    "page": "google.com/",
                    "subdomain": "google.com",
                    "root_domain": "google.com",
                    "title": "",
                    "last_crawled": "2023-07-08",
                    "http_code": 301,
                    "pages_to_page": 632375109,
                    "nofollow_pages_to_page": 79177039,
                    "redirect_pages_to_page": 229020812,
                    "external_pages_to_page": 632375108,
                    "external_nofollow_pages_to_page": 79177039,
                    "external_redirect_pages_to_page": 229020812,
                    "deleted_pages_to_page": 133826847,
                    "root_domains_to_page": 749728,
                    "indirect_root_domains_to_page": 190038,
                    "deleted_root_domains_to_page": 148108,
                    "nofollow_root_domains_to_page": 162414,
                    "pages_to_subdomain": 1380526490,
                    "nofollow_pages_to_subdomain": 130646887,
                    "redirect_pages_to_subdomain": 248071751,
                    "external_pages_to_subdomain": 1380524140,
                    "external_nofollow_pages_to_subdomain": 130646887,
                    "external_redirect_pages_to_subdomain": 248069408,
                    "deleted_pages_to_subdomain": 261636416,
                    "root_domains_to_subdomain": 991961,
                    "deleted_root_domains_to_subdomain": 180479,
                    "nofollow_root_domains_to_subdomain": 191607,
                    "pages_to_root_domain": 1380526490,
                    "nofollow_pages_to_root_domain": 130646887,
                    "redirect_pages_to_root_domain": 248071751,
                    "external_pages_to_root_domain": 1380524140,
                    "external_indirect_pages_to_root_domain": 155031764,
                    "external_nofollow_pages_to_root_domain": 130646887,
                    "external_redirect_pages_to_root_domain": 248069408,
                    "deleted_pages_to_root_domain": 261636416,
                    "root_domains_to_root_domain": 991961,
                    "indirect_root_domains_to_root_domain": 200895,
                    "deleted_root_domains_to_root_domain": 180479,
                    "nofollow_root_domains_to_root_domain": 191607,
                    "page_authority": 89,
                    "domain_authority": 94,
                    "link_propensity": 2.007935291e-05,
                    "spam_score": 1,
                    "root_domains_from_page": 1,
                    "nofollow_root_domains_from_page": 0,
                    "pages_from_page": 1,
                    "nofollow_pages_from_page": 0,
                    "root_domains_from_root_domain": 176,
                    "nofollow_root_domains_from_root_domain": 0,
                    "pages_from_root_domain": 2205980,
                    "nofollow_pages_from_root_domain": 0,
                    "pages_crawled_from_root_domain": 8765223,
                    "root_domains_to_page_by_root_domains": [
                        72412,
                        198496,
                        218968,
                        163327,
                        83811,
                        11429,
                        1201,
                        73,
                        11,
                        0
                    ],
                    "root_domains_to_root_domain_by_root_domains": [
                        98862,
                        273287,
                        290388,
                        209684,
                        103993,
                        14273,
                        1382,
                        80,
                        12,
                        0
                    ],
                    "nofollow_root_domains_to_root_domain_by_root_domains": [
                        12320,
                        40671,
                        61782,
                        50901,
                        22909,
                        2836,
                        183,
                        5,
                        0,
                        0
                    ],
                    "root_domains_to_page_by_domain_authority": [
                        502065,
                        121027,
                        59355,
                        30845,
                        15153,
                        11438,
                        4736,
                        2733,
                        1690,
                        686
                    ],
                    "root_domains_to_subdomain_by_domain_authority": [
                        659912,
                        160277,
                        80733,
                        42117,
                        20547,
                        15756,
                        6241,
                        3506,
                        2089,
                        783
                    ],
                    "root_domains_to_root_domain_by_domain_authority": [
                        659912,
                        160277,
                        80733,
                        42117,
                        20547,
                        15756,
                        6241,
                        3506,
                        2089,
                        783
                    ],
                    "nofollow_root_domains_to_root_domain_by_domain_authority": [
                        108511,
                        39021,
                        20746,
                        11280,
                        5701,
                        3861,
                        1437,
                        657,
                        299,
                        94
                    ],
                    "pages_to_root_domain_by_spam_score": [
                        592186867,
                        235282664,
                        70194585,
                        91136345,
                        49728542,
                        26197883,
                        78671709,
                        31100724,
                        7346436,
                        1014358
                    ],
                    "nofollow_pages_to_root_domain_by_spam_score": [
                        55846395,
                        11955239,
                        5904063,
                        8637888,
                        2367036,
                        4343897,
                        3700121,
                        895102,
                        1040575,
                        163560
                    ],
                    "root_domains_to_page_by_spam_score": [
                        294356,
                        100492,
                        52099,
                        36075,
                        30014,
                        23333,
                        17037,
                        13464,
                        9823,
                        3954
                    ],
                    "root_domains_to_subdomain_by_spam_score": [
                        418505,
                        132347,
                        66477,
                        44512,
                        36291,
                        28071,
                        20527,
                        16033,
                        10987,
                        4307
                    ],
                    "root_domains_to_root_domain_by_spam_score": [
                        418505,
                        132347,
                        66477,
                        44512,
                        36291,
                        28071,
                        20527,
                        16033,
                        10987,
                        4307
                    ],
                    "nofollow_root_domains_to_root_domain_by_spam_score": [
                        84490,
                        26810,
                        12920,
                        6779,
                        4927,
                        3915,
                        2619,
                        1869,
                        1031,
                        389
                    ]
                }
            ]
        }
        // const response = await axios.request(config)
        console.log(JSON.stringify(response.data));
    } catch (e) {
        return {};
    }
}

module.exports = {
    urlMetrics
}