/* One entry per world for g-world.html?w=<name>. All coordinates are pixels of that world's
   finished painting (art/<name>.jpg), so open the image in any viewer to read them off. */
var WORLDS={
  valley:{
    size:[1376,838],keep:.925,sprites:'',
    alt:'A sunset meadow under a pink sky. A stone path forks around a giant blossom tree with a laughing face carved into its trunk: left to a little golden theatre with searchlights, right to a teal workshop tower.',
    end:{l:[305,470],r:[1065,470]},beams:[305,392],
    way:{l:[30,290,500,820],r:[870,290,1346,820]},
    board:{l:[590,594,776,658,-1],r:[610,688,792,746,1.2]},
    trail:{l:[[690,836],[660,770],[560,712],[440,672],[330,648],[285,628],[320,600],[385,570],[365,548],[325,530]],
           r:[[690,836],[760,770],[880,706],[990,672],[1058,648],[1050,620],[995,597],[1010,582],[1040,566]]},
    petals:{from:[690,250],rx:250,ry:105,rate:.24,colors:['#ffc4dd','#f7a3c6','#ffd9e8','#f08fb4']},
    shake:[470,130,910,560],
    birds:{n:[5,9],y:[150,330],s:[.45,.8]},
    falls:[[1281,512,1310,552,9]],
    frames:[[925,372,24,-.14],[1196,318,22,.16],[1188,470,17,.08],[1010,300,15,-.08]],
    twinkle:[226,412,390,530],
    deer:[{path:[[150,612],[330,592],[440,578],[560,566],[820,570],[935,588]],h:5.6,z:.47,hop:5.4}],
    boat:[{a:[1160,584],b:[1400,590],h:3.7,period:150,phase:1.2}],
    drift:[{sprite:'balloon',a:[1500,300],b:[-120,255],h:8.5,period:330,phase:.14,bob:.5}],
    butterflies:[{at:[170,720],s:3.6},{at:[1215,735],s:3.1,hue:-28},{at:[1010,770],s:2.4,hue:22}]
  },
  coast:{
    size:[1376,852],pad:84,keep:.93,sprites:'',font:"'Baloo 2',sans-serif",
    css:{'--ink':'#08303f','--ink2':'#1a6478','--halo':'255,244,232'},
    alt:'A flowery clifftop above a turquoise sea at sunrise. A sandy path forks around a standing rock with a laughing face carved into it: left to a seaside cinema with searchlights, right to a lighthouse covered in glowing screens.',
    end:{l:[300,340],r:[1140,300]},beams:[300,250],lamp:[1140,128],
    way:{l:[30,150,480,740],r:[880,150,1346,740]},
    board:{l:[583,508,752,568,-1],r:[572,604,735,666,1]},
    trail:{l:[[690,768],[640,705],[550,650],[460,600],[395,558],[345,515],[290,490],[320,468],[368,450],[345,428]],
           r:[[690,768],[760,705],[850,640],[925,592],[975,548],[1010,512],[1085,488],[1108,462],[1062,430],[1082,408],[1105,392]]},
    petals:{from:[700,90],rx:110,ry:30,edge:.9,rate:.15,colors:['#ffffff','#fff3c9','#ffe58a','#ffd9e8']},
    shake:[540,70,860,480],
    birds:{n:[4,7],y:[110,290],s:[.5,.85],color:'rgba(255,255,255,.92)'},
    falls:[[1190,425,1208,545,8],[1138,512,1158,598,7]],
    frames:[[1050,250,22,-.12],[1288,195,20,.14],[1010,330,16,.08],[1280,330,17,-.1]],
    twinkle:[212,300,396,360],
    deer:[{path:[[205,522],[330,500],[430,484],[540,476],[870,480],[975,490]],h:5.2,z:.45,hop:5.4}],
    boat:[{a:[420,374],b:[1040,368],h:3.3,period:170,phase:2.2,z:.06}],
    drift:[{sprite:'balloon',a:[1500,205],b:[-120,150],h:8,period:340,phase:.12,bob:.5}],
    butterflies:[{at:[230,650],s:3.6},{at:[1180,690],s:3.1,hue:-28},{at:[1000,720],s:2.4,hue:22}]
  },
  isles:{
    size:[1376,768],keep:.9,sprites:'',font:"Cinzel,serif",
    depth:.007,                                         /* how far the mouse slides the depth layers (other worlds: .016) */
    css:{'--ink':'#ffdfae','--ink2':'#fffaf0','--halo':'44,14,78','--edge':'rgba(58,12,84,.95)'},
    alt:'Floating islands above a sea of pink clouds at twilight. A stone path forks around a standing stone with a laughing face carved into it: a bridge left to a golden theatre stage with searchlights, a bridge right to a teal observatory of glowing screens.',
    end:{l:[258,385],r:[1170,385]},beams:[258,282],
    way:{l:[30,230,530,740],r:[990,230,1346,740]},
    /* no signposts: a word floats above each building (centre of each word, painting px). Locked in 2026-11-10. */
    words:{l:[258,214],r:[1172,200]},
    sway:.27,                                           /* phones: pan far enough to bring each word on screen */
    trail:{l:[[690,766],[682,690],[640,625],[560,572],[470,535],[395,505],[335,484],[285,470]],
           r:[[690,766],[705,690],[760,628],[860,585],[950,556],[1015,528],[1085,500],[1135,478],[1150,458]]},
    petals:{from:[700,235],rx:100,ry:30,edge:.55,rate:.13,colors:['#8ff8ff','#ff9fe6','#fff2a8','#c9a6ff']},
    shake:[572,200,822,560],
    birds:{n:[4,8],y:[130,330],s:[.45,.8],color:'rgba(255,214,246,.78)'},
    /* one box per ribbon of painted water: [x0,y0,x1,y1,streaks] */
    falls:[[491,368,499,436,4],[941,376,948,452,4],[921,378,926,438,3],[123,496,136,598,6]],
    frames:[[1000,318,20,-.12],[1326,330,18,.14],[1268,268,15,.08],[1035,476,16,-.1]],
    twinkle:[165,285,362,462],
    pollen:[150,255,240],pollenCount:44,pollenAlpha:1,
    /* two balloons high in the open sky. swing = they drift to and fro between a and b (y = basket height in the
       painting), so they stay in the gap between the two floating words and never pass behind either of them.
       The engine draws the smaller one first, so it always passes behind the bigger one.
       near = the a and b x used in the phone layout, so they turn round just past the edges of a phone screen. */
    drift:[{sprite:'balloon',a:[412,204],b:[1012,192],h:9,period:260,phase:.08,bob:.5,swing:true,near:[505,875]},
           {sprite:'balloon',a:[1022,160],b:[402,168],h:6.2,period:340,phase:.15,bob:.4,hue:150,swing:true,near:[895,485]}],
    butterflies:[{at:[170,640],s:3.8},{at:[1255,670],s:3.2,hue:150},{at:[560,700],s:2.6,hue:60}]
  }
};
