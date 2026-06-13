import { User, Users, Heart, Leaf, Mountain, Activity, Building2, Sun, Waves, Sparkles } from "lucide-react";

export const lifestyleMatrixSections = [

{
id:"retreat_profile",
title:"Retreat Profile",
questions:[

{
id:"retreat_for",
question:"Who is this retreat for?",
options:[
{label:"Solo",icon:User},
{label:"Couple",icon:Heart},
{label:"Family",icon:Users},
{label:"Corporate",icon:Building2}
]
},

{
id:"adult_count",
question:"Number of Adults",
type:"number",
min:1,
max:100,
visibleFor:["Family","Corporate"]
},

{
id:"children_count",
question:"Number of Children",
type:"number",
min:0,
max:20,
visibleFor:["Family","Corporate"]
},

{
id:"room_count",
question:"Number of Rooms",
type:"number",
min:1,
max:10,
visibleFor:["Family","Corporate"]
},

{
id:"retreat_goal",
question:"Primary retreat goal?",
multiple:true,
allowOther:true,
options:[
{label:"Healing",icon:Heart},
{label:"Detox",icon:Leaf},
{label:"Relaxation",icon:Sparkles},
{label:"Other",icon:Sparkles}
]
}

]
},

{
id:"wellness_preferences",
title:"Wellness Preferences",
questions:[

{
id:"natural_environment",
question:"Preferred natural environment?",
options:[
{label:"Forest",icon:Leaf},
{label:"Beach",icon:Waves},
{label:"Mountain",icon:Mountain},
{label:"Garden",icon:Leaf}
]
},

{
id:"mind_body_practice",
question:"Interested mind-body practice?",
multiple:true,
allowOther:true,
options:[
{label:"Yoga",icon:Activity},
{label:"Pranayama",icon:Activity},
{label:"Meditation",icon:Sparkles},
{label:"Breathwork",icon:Activity},
{label:"Other",icon:Sparkles}
]
},

{
id:"therapeutic_experience",
question:"Preferred therapeutic experience?",
multiple:true,
allowOther:true,
options:[
{label:"Panchakarma",icon:Leaf},
{label:"Sound Healing",icon:Sparkles},
{label:"Acupuncture",icon:Heart},
{label:"Other",icon:Sparkles}
]
},

{
id:"creative_activity",
question:"Preferred creative activity?",
multiple:true,
allowOther:true,
options:[
{label:"Music Therapy",icon:Sparkles},
{label:"Art Therapy",icon:Sparkles},
{label:"Movement Therapy",icon:Activity},
{label:"Other",icon:Sparkles}
]
},

{
id:"activity_intensity",
question:"Preferred activity intensity?",
options:[
{label:"Low",icon:Activity},
{label:"Moderate",icon:Activity},
{label:"High",icon:Activity}
]
},

{
id:"wellness_learning",
question:"Wellness learning interest?",
multiple:true,
allowOther:true,
options:[
{label:"Workshops",icon:Sparkles},
{label:"Nutrition Education",icon:Leaf},
{label:"Stress Management",icon:Heart},
{label:"Other",icon:Sparkles}
]
}

]
},

{
id:"food_lifestyle",
title:"Food & Lifestyle",
questions:[

{
id:"food_style",
question:"Preferred food style?",
options:[
{label:"Vegetarian",icon:Leaf},
{label:"Non-Vegetarian",icon:Heart},
{label:"Vegan",icon:Leaf},
{label:"Mixed",icon:Sparkles}
]
},

{
id:"retreat_experience",
question:"Preferred retreat experience?",
multiple:true,
allowOther:true,
options:[
{label:"Silent",icon:Sparkles},
{label:"Therapy-Focused",icon:Heart},
{label:"Leisure",icon:Sun},
{label:"Other",icon:Sparkles}
]
},

{
id:"comfort_level",
question:"Preferred comfort level?",
options:[
{label:"Luxury",icon:Sparkles},
{label:"Therapeutic",icon:Heart},
{label:"Balanced",icon:Activity}
]
}

]
},

{
id:"environment_exposure",
title:"Environment & Exposure",
questions:[

{
id:"work_posture",
question:"Work posture mainly?",
options:[
{label:"Desk-bound",icon:Building2},
{label:"Standing",icon:Activity},
{label:"Physical Labour",icon:Activity},
{label:"Mixed",icon:Activity}
]
},

{
id:"alcohol_consumption",
question:"Do you consume alcohol?",
options:[
{label:"Yes",icon:Heart},
{label:"No",icon:Leaf}
]
},

{
id:"tobacco_use",
question:"Do you use tobacco?",
options:[
{label:"Yes",icon:Heart},
{label:"No",icon:Leaf}
]
},

{
id:"living_environment",
question:"Current living environment?",
options:[
{label:"Urban",icon:Building2},
{label:"Semi-Urban",icon:Building2},
{label:"Rural",icon:Leaf}
]
},

{
id:"climate_type",
question:"Preferred climate type?",
options:[
{label:"Hot",icon:Sun},
{label:"Cold",icon:Mountain},
{label:"Moderate",icon:Sun}
]
},

{
id:"terrain_type",
question:"Preferred terrain type?",
options:[
{label:"Plains",icon:Sun},
{label:"Coastal",icon:Waves},
{label:"Hills",icon:Mountain},
{label:"Arid",icon:Sun}
]
},

{
id:"sunlight_exposure",
question:"Daily sunlight exposure?",
options:[
{label:"Low",icon:Sun},
{label:"Moderate",icon:Sun},
{label:"High",icon:Sun}
]
},

{
id:"pollution_exposure",
question:"Pollution exposure level?",
options:[
{label:"Low",icon:Leaf},
{label:"High",icon:Building2}
]
},

{
id:"ac_dependency",
question:"Air-conditioner dependency level?",
options:[
{label:"Most of Day",icon:Building2},
{label:"Occasional",icon:Activity},
{label:"No",icon:Leaf}
]
},

{
id:"travel_frequency",
question:"Travel frequency currently?",
options:[
{label:"Rare",icon:User},
{label:"Monthly",icon:Users},
{label:"Weekly",icon:Activity}
]
}

]
}

];