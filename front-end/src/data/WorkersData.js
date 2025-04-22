const workersData = [
    {
      "_id": "w1",
      "name": "Navya Mehra",
      "email": "navya.mehra1@email.com",
      "mobile": "9843369758",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Nashik",
      "experience": 7
    },
    {
      "_id": "w2",
      "name": "Meera Sharma",
      "email": "meera.sharma2@email.com",
      "mobile": "9855713906",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Patna",
      "experience": 3
    },
    {
      "_id": "w3",
      "name": "Arjun Yadav",
      "email": "arjun.yadav3@email.com",
      "mobile": "9862942904",
      "category": "Carpenter",
      "description": "Crafts furniture, doors, and wooden interiors.",
      "location": "Ludhiana",
      "experience": 2
    },
    {
      "_id": "w4",
      "name": "Aaliya Yadav",
      "email": "aaliya.yadav4@email.com",
      "mobile": "9822656104",
      "category": "Carpenter",
      "description": "Crafts furniture, doors, and wooden interiors.",
      "location": "Nagpur",
      "experience": 2
    },
    {
      "_id": "w5",
      "name": "Shaurya Mehra",
      "email": "shaurya.mehra5@email.com",
      "mobile": "9844177376",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Pune",
      "experience": 10
    },
    {
      "_id": "w6",
      "name": "Aadhya Ali",
      "email": "aadhya.ali6@email.com",
      "mobile": "9812578373",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Ludhiana",
      "experience": 8
    },
    {
      "_id": "w7",
      "name": "Meera Reddy",
      "email": "meera.reddy7@email.com",
      "mobile": "9843252101",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Nashik",
      "experience": 8
    },
    {
      "_id": "w8",
      "name": "Atharv Kumar",
      "email": "atharv.kumar8@email.com",
      "mobile": "9844280188",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Faridabad",
      "experience": 3
    },
    {
      "_id": "w9",
      "name": "Saanvi Ali",
      "email": "saanvi.ali9@email.com",
      "mobile": "9853831786",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Jaipur",
      "experience": 4
    },
    {
      "_id": "w10",
      "name": "Ira Sharma",
      "email": "ira.sharma10@email.com",
      "mobile": "9860061676",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Mumbai",
      "experience": 5
    },
    {
      "_id": "w11",
      "name": "Aanya Reddy",
      "email": "aanya.reddy11@email.com",
      "mobile": "9869354989",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Mumbai",
      "experience": 10
    },
    {
      "_id": "w12",
      "name": "Sai Yadav",
      "email": "sai.yadav12@email.com",
      "mobile": "9898046057",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Chennai",
      "experience": 6
    },
    {
      "_id": "w13",
      "name": "Arjun Reddy",
      "email": "arjun.reddy13@email.com",
      "mobile": "9887848543",
      "category": "Carpenter",
      "description": "Crafts furniture, doors, and wooden interiors.",
      "location": "Pune",
      "experience": 3
    },
    {
      "_id": "w14",
      "name": "Ishita Ali",
      "email": "ishita.ali14@email.com",
      "mobile": "9829400118",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Nashik",
      "experience": 7
    },
    {
      "_id": "w15",
      "name": "Sai Kumar",
      "email": "sai.kumar15@email.com",
      "mobile": "9873848943",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Ahmedabad",
      "experience": 3
    },
    {
      "_id": "w16",
      "name": "Myra Patel",
      "email": "myra.patel16@email.com",
      "mobile": "9852088817",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Bhopal",
      "experience": 6
    },
    {
      "_id": "w17",
      "name": "Diya Mehra",
      "email": "diya.mehra17@email.com",
      "mobile": "9835857759",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Vadodara",
      "experience": 9
    },
    {
      "_id": "w18",
      "name": "Laksh Patel",
      "email": "laksh.patel18@email.com",
      "mobile": "9895225874",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Bhopal",
      "experience": 10
    },
    {
      "_id": "w19",
      "name": "Anika Mehra",
      "email": "anika.mehra19@email.com",
      "mobile": "9869801054",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Faridabad",
      "experience": 10
    },
    {
      "_id": "w20",
      "name": "Saanvi Yadav",
      "email": "saanvi.yadav20@email.com",
      "mobile": "9839464883",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Vadodara",
      "experience": 6
    },
    {
      "_id": "w21",
      "name": "Anaya Sharma",
      "email": "anaya.sharma21@email.com",
      "mobile": "9815774111",
      "category": "Carpenter",
      "description": "Crafts furniture, doors, and wooden interiors.",
      "location": "Agra",
      "experience": 7
    },
    {
      "_id": "w22",
      "name": "Vivaan Singh",
      "email": "vivaan.singh22@email.com",
      "mobile": "9834374557",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Indore",
      "experience": 7
    },
    {
      "_id": "w23",
      "name": "Aditya Mehra",
      "email": "aditya.mehra23@email.com",
      "mobile": "9889203618",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Ludhiana",
      "experience": 5
    },
    {
      "_id": "w24",
      "name": "Arjun Mehra",
      "email": "arjun.mehra24@email.com",
      "mobile": "9864567487",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Mumbai",
      "experience": 5
    },
    {
      "_id": "w25",
      "name": "Ira Mehra",
      "email": "ira.mehra25@email.com",
      "mobile": "9849389011",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Hyderabad",
      "experience": 2
    },
    {
      "_id": "w26",
      "name": "Ishita Reddy",
      "email": "ishita.reddy26@email.com",
      "mobile": "9842083032",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Pune",
      "experience": 9
    },
    {
      "_id": "w27",
      "name": "Atharv Sharma",
      "email": "atharv.sharma27@email.com",
      "mobile": "9885902972",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Ludhiana",
      "experience": 3
    },
    {
      "_id": "w28",
      "name": "Dhruv Sharma",
      "email": "dhruv.sharma28@email.com",
      "mobile": "9859101044",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Delhi",
      "experience": 5
    },
    {
      "_id": "w29",
      "name": "Vihaan Patel",
      "email": "vihaan.patel29@email.com",
      "mobile": "9888699344",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Nagpur",
      "experience": 7
    },
    {
      "_id": "w30",
      "name": "Krishna Mehra",
      "email": "krishna.mehra30@email.com",
      "mobile": "9815491248",
      "category": "Carpenter",
      "description": "Crafts furniture, doors, and wooden interiors.",
      "location": "Bangalore",
      "experience": 6
    },
    {
      "_id": "w31",
      "name": "Aanya Ali",
      "email": "aanya.ali31@email.com",
      "mobile": "9865565367",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Lucknow",
      "experience": 4
    },
    {
      "_id": "w32",
      "name": "Dhruv Yadav",
      "email": "dhruv.yadav32@email.com",
      "mobile": "9851999405",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Lucknow",
      "experience": 9
    },
    {
      "_id": "w33",
      "name": "Meera Ali",
      "email": "meera.ali33@email.com",
      "mobile": "9843665154",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Nagpur",
      "experience": 2
    },
    {
      "_id": "w34",
      "name": "Kiara Reddy",
      "email": "kiara.reddy34@email.com",
      "mobile": "9880062480",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Bangalore",
      "experience": 8
    },
    {
      "_id": "w35",
      "name": "Shaurya Yadav",
      "email": "shaurya.yadav35@email.com",
      "mobile": "9855033846",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Patna",
      "experience": 6
    },
    {
      "_id": "w36",
      "name": "Atharv Kumar",
      "email": "atharv.kumar36@email.com",
      "mobile": "9837871196",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Hyderabad",
      "experience": 10
    },
    {
      "_id": "w37",
      "name": "Shaurya Kumar",
      "email": "shaurya.kumar37@email.com",
      "mobile": "9814900339",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Chennai",
      "experience": 8
    },
    {
      "_id": "w38",
      "name": "Navya Singh",
      "email": "navya.singh38@email.com",
      "mobile": "9813998553",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Vadodara",
      "experience": 10
    },
    {
      "_id": "w39",
      "name": "Ishita Singh",
      "email": "ishita.singh39@email.com",
      "mobile": "9849241639",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Pune",
      "experience": 8
    },
    {
      "_id": "w40",
      "name": "Aditya Sharma",
      "email": "aditya.sharma40@email.com",
      "mobile": "9884693230",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Kolkata",
      "experience": 5
    },
    {
      "_id": "w41",
      "name": "Ishita Yadav",
      "email": "ishita.yadav41@email.com",
      "mobile": "9873994107",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Ghaziabad",
      "experience": 7
    },
    {
      "_id": "w42",
      "name": "Aanya Reddy",
      "email": "aanya.reddy42@email.com",
      "mobile": "9862621639",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Nagpur",
      "experience": 9
    },
    {
      "_id": "w43",
      "name": "Aryan Patel",
      "email": "aryan.patel43@email.com",
      "mobile": "9878228101",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Ghaziabad",
      "experience": 8
    },
    {
      "_id": "w44",
      "name": "Vivaan Kumar",
      "email": "vivaan.kumar44@email.com",
      "mobile": "9832119911",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Delhi",
      "experience": 3
    },
    {
      "_id": "w45",
      "name": "Ishita Patel",
      "email": "ishita.patel45@email.com",
      "mobile": "9883515950",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Delhi",
      "experience": 6
    },
    {
      "_id": "w46",
      "name": "Riya Patel",
      "email": "riya.patel46@email.com",
      "mobile": "9822237793",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Nagpur",
      "experience": 7
    },
    {
      "_id": "w47",
      "name": "Myra Kumar",
      "email": "myra.kumar47@email.com",
      "mobile": "9894974561",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Ahmedabad",
      "experience": 8
    },
    {
      "_id": "w48",
      "name": "Aryan Mehra",
      "email": "aryan.mehra48@email.com",
      "mobile": "9846999278",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Patna",
      "experience": 5
    },
    {
      "_id": "w49",
      "name": "Laksh Yadav",
      "email": "laksh.yadav49@email.com",
      "mobile": "9820820521",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Ahmedabad",
      "experience": 3
    },
    {
      "_id": "w50",
      "name": "Diya Reddy",
      "email": "diya.reddy50@email.com",
      "mobile": "9891119192",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Pune",
      "experience": 5
    },
    {
      "_id": "w51",
      "name": "Prisha Yadav",
      "email": "prisha.yadav51@email.com",
      "mobile": "9882535106",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Ahmedabad",
      "experience": 4
    },
    {
      "_id": "w52",
      "name": "Anaya Kumar",
      "email": "anaya.kumar52@email.com",
      "mobile": "9831610236",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Hyderabad",
      "experience": 2
    },
    {
      "_id": "w53",
      "name": "Sai Sharma",
      "email": "sai.sharma53@email.com",
      "mobile": "9858778455",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Ghaziabad",
      "experience": 4
    },
    {
      "_id": "w54",
      "name": "Avni Sharma",
      "email": "avni.sharma54@email.com",
      "mobile": "9852111248",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Ahmedabad",
      "experience": 7
    },
    {
      "_id": "w55",
      "name": "Aadhya Ali",
      "email": "aadhya.ali55@email.com",
      "mobile": "9861396597",
      "category": "Carpenter",
      "description": "Crafts furniture, doors, and wooden interiors.",
      "location": "Ludhiana",
      "experience": 4
    },
    {
      "_id": "w56",
      "name": "Avni Ali",
      "email": "avni.ali56@email.com",
      "mobile": "9838179719",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Ahmedabad",
      "experience": 10
    },
    {
      "_id": "w57",
      "name": "Aanya Reddy",
      "email": "aanya.reddy57@email.com",
      "mobile": "9832837882",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Delhi",
      "experience": 4
    },
    {
      "_id": "w58",
      "name": "Myra Patel",
      "email": "myra.patel58@email.com",
      "mobile": "9860782880",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Agra",
      "experience": 7
    },
    {
      "_id": "w59",
      "name": "Navya Patel",
      "email": "navya.patel59@email.com",
      "mobile": "9819138894",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Nashik",
      "experience": 8
    },
    {
      "_id": "w60",
      "name": "Vihaan Reddy",
      "email": "vihaan.reddy60@email.com",
      "mobile": "9813027624",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Nashik",
      "experience": 3
    },
    {
      "_id": "w61",
      "name": "Om Mehra",
      "email": "om.mehra61@email.com",
      "mobile": "9843114304",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Lucknow",
      "experience": 4
    },
    {
      "_id": "w62",
      "name": "Dhruv Reddy",
      "email": "dhruv.reddy62@email.com",
      "mobile": "9838155208",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Ghaziabad",
      "experience": 4
    },
    {
      "_id": "w63",
      "name": "Aarav Reddy",
      "email": "aarav.reddy63@email.com",
      "mobile": "9879751353",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Nashik",
      "experience": 7
    },
    {
      "_id": "w64",
      "name": "Avni Reddy",
      "email": "avni.reddy64@email.com",
      "mobile": "9856126321",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Vadodara",
      "experience": 4
    },
    {
      "_id": "w65",
      "name": "Kabir Ali",
      "email": "kabir.ali65@email.com",
      "mobile": "9861728229",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Ahmedabad",
      "experience": 10
    },
    {
      "_id": "w66",
      "name": "Anika Ali",
      "email": "anika.ali66@email.com",
      "mobile": "9832530600",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Jaipur",
      "experience": 9
    },
    {
      "_id": "w67",
      "name": "Sai Yadav",
      "email": "sai.yadav67@email.com",
      "mobile": "9865051341",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Vadodara",
      "experience": 8
    },
    {
      "_id": "w68",
      "name": "Arjun Yadav",
      "email": "arjun.yadav68@email.com",
      "mobile": "9858936775",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Ghaziabad",
      "experience": 6
    },
    {
      "_id": "w69",
      "name": "Aadhya Reddy",
      "email": "aadhya.reddy69@email.com",
      "mobile": "9864979680",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Delhi",
      "experience": 6
    },
    {
      "_id": "w70",
      "name": "Aaliya Ali",
      "email": "aaliya.ali70@email.com",
      "mobile": "9848640275",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Faridabad",
      "experience": 3
    },
    {
      "_id": "w71",
      "name": "Laksh Ali",
      "email": "laksh.ali71@email.com",
      "mobile": "9896418516",
      "category": "Carpenter",
      "description": "Crafts furniture, doors, and wooden interiors.",
      "location": "Pune",
      "experience": 3
    },
    {
      "_id": "w72",
      "name": "Mira Yadav",
      "email": "mira.yadav72@email.com",
      "mobile": "9864234715",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Hyderabad",
      "experience": 7
    },
    {
      "_id": "w73",
      "name": "Aarav Reddy",
      "email": "aarav.reddy73@email.com",
      "mobile": "9873846588",
      "category": "Carpenter",
      "description": "Crafts furniture, doors, and wooden interiors.",
      "location": "Lucknow",
      "experience": 8
    },
    {
      "_id": "w74",
      "name": "Mira Patel",
      "email": "mira.patel74@email.com",
      "mobile": "9857581462",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Indore",
      "experience": 4
    },
    {
      "_id": "w75",
      "name": "Arjun Mehra",
      "email": "arjun.mehra75@email.com",
      "mobile": "9815444462",
      "category": "Carpenter",
      "description": "Crafts furniture, doors, and wooden interiors.",
      "location": "Vadodara",
      "experience": 7
    },
    {
      "_id": "w76",
      "name": "Vihaan Reddy",
      "email": "vihaan.reddy76@email.com",
      "mobile": "9886811670",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Bhopal",
      "experience": 5
    },
    {
      "_id": "w77",
      "name": "Krishna Sharma",
      "email": "krishna.sharma77@email.com",
      "mobile": "9893136878",
      "category": "Carpenter",
      "description": "Crafts furniture, doors, and wooden interiors.",
      "location": "Patna",
      "experience": 3
    },
    {
      "_id": "w78",
      "name": "Saanvi Ali",
      "email": "saanvi.ali78@email.com",
      "mobile": "9822006376",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Nashik",
      "experience": 3
    },
    {
      "_id": "w79",
      "name": "Laksh Yadav",
      "email": "laksh.yadav79@email.com",
      "mobile": "9856441070",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Indore",
      "experience": 4
    },
    {
      "_id": "w80",
      "name": "Anaya Sharma",
      "email": "anaya.sharma80@email.com",
      "mobile": "9832956255",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Jaipur",
      "experience": 8
    },
    {
      "_id": "w81",
      "name": "Laksh Sharma",
      "email": "laksh.sharma81@email.com",
      "mobile": "9877124616",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Mumbai",
      "experience": 8
    },
    {
      "_id": "w82",
      "name": "Ira Yadav",
      "email": "ira.yadav82@email.com",
      "mobile": "9864369600",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Ahmedabad",
      "experience": 10
    },
    {
      "_id": "w83",
      "name": "Aditya Patel",
      "email": "aditya.patel83@email.com",
      "mobile": "9817818080",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Ghaziabad",
      "experience": 2
    },
    {
      "_id": "w84",
      "name": "Ishita Mehra",
      "email": "ishita.mehra84@email.com",
      "mobile": "9847970767",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Bangalore",
      "experience": 4
    },
    {
      "_id": "w85",
      "name": "Aadhya Yadav",
      "email": "aadhya.yadav85@email.com",
      "mobile": "9859464252",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Jaipur",
      "experience": 5
    },
    {
      "_id": "w86",
      "name": "Trisha Singh",
      "email": "trisha.singh86@email.com",
      "mobile": "9815786670",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Faridabad",
      "experience": 10
    },
    {
      "_id": "w87",
      "name": "Krishna Sharma",
      "email": "krishna.sharma87@email.com",
      "mobile": "9876667269",
      "category": "Carpenter",
      "description": "Crafts furniture, doors, and wooden interiors.",
      "location": "Ludhiana",
      "experience": 2
    },
    {
      "_id": "w88",
      "name": "Krishna Sharma",
      "email": "krishna.sharma88@email.com",
      "mobile": "9834107707",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Vadodara",
      "experience": 5
    },
    {
      "_id": "w89",
      "name": "Vihaan Singh",
      "email": "vihaan.singh89@email.com",
      "mobile": "9865404136",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Delhi",
      "experience": 9
    },
    {
      "_id": "w90",
      "name": "Krishna Yadav",
      "email": "krishna.yadav90@email.com",
      "mobile": "9856360496",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Ghaziabad",
      "experience": 8
    },
    {
      "_id": "w91",
      "name": "Ranveer Kumar",
      "email": "ranveer.kumar91@email.com",
      "mobile": "9812042925",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Pune",
      "experience": 6
    },
    {
      "_id": "w92",
      "name": "Sai Singh",
      "email": "sai.singh92@email.com",
      "mobile": "9896738334",
      "category": "Plumber",
      "description": "Expert in installing and repairing pipelines and water systems.",
      "location": "Ahmedabad",
      "experience": 10
    },
    {
      "_id": "w93",
      "name": "Mira Mehra",
      "email": "mira.mehra93@email.com",
      "mobile": "9819009775",
      "category": "Carpenter",
      "description": "Crafts furniture, doors, and wooden interiors.",
      "location": "Jaipur",
      "experience": 8
    },
    {
      "_id": "w94",
      "name": "Tanya Singh",
      "email": "tanya.singh94@email.com",
      "mobile": "9870220416",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Delhi",
      "experience": 6
    },
    {
      "_id": "w95",
      "name": "Tanya Sharma",
      "email": "tanya.sharma95@email.com",
      "mobile": "9815977337",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Bhopal",
      "experience": 8
    },
    {
      "_id": "w96",
      "name": "Ishita Patel",
      "email": "ishita.patel96@email.com",
      "mobile": "9822492578",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Kolkata",
      "experience": 4
    },
    {
      "_id": "w97",
      "name": "Tanya Singh",
      "email": "tanya.singh97@email.com",
      "mobile": "9856160205",
      "category": "Electrician",
      "description": "Handles electrical wiring, fixtures, and appliances.",
      "location": "Ludhiana",
      "experience": 2
    },
    {
      "_id": "w98",
      "name": "Riya Singh",
      "email": "riya.singh98@email.com",
      "mobile": "9820786410",
      "category": "Mason",
      "description": "Specialized in construction and structural building work.",
      "location": "Chennai",
      "experience": 9
    },
    {
      "_id": "w99",
      "name": "Sai Yadav",
      "email": "sai.yadav99@email.com",
      "mobile": "9881044425",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Faridabad",
      "experience": 5
    },
    {
      "_id": "w100",
      "name": "Anaya Singh",
      "email": "anaya.singh100@email.com",
      "mobile": "9849811155",
      "category": "Security",
      "description": "Trained in surveillance and property protection.",
      "location": "Chennai",
      "experience": 3
    }
  ];
  
  export default workersData;