import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import TaskList from "./TaskList";
import { useDispatch } from "react-redux";
import { addTodo } from "./taskSlice";

const sonData = [{
    name: '',
    gender: '',
    date: ''
}];
const daughterData = [{
    name: '',
    gender: '',
    date: ''
}];
const FamilyMemberDetails = (props) => {
    console.log("props", props);
    const { familyMember, email, parentMember, phone } = props;
    const dispatch = useDispatch();

    const [selfData, setSelfData] = useState({
        name: 'self',
        gender: '',
        date: ''
    })
    const [spouseData, setSpouseData] = useState({
        name: 'spouse',
        gender: '',
        date: ''
    })
    const [dependantSonData, setDependantSonData] = useState(sonData)
    const [dependantDaughterData, setDependantDaughterData] = useState(daughterData)
    const dummySonDaughterCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [showTaskList, setShowTaskList] = useState(false)

    useEffect(() => {
        let sd = []
        let dd = []
        if (familyMember.dependantSon !== "") {
            dummySonDaughterCount.map((value, index) => {
                if (index < familyMember.dependantSonCount) {
                    sd.push({
                        name: 'dependant Son ' + (index + 1),
                        gender: '',
                        date: ''
                    })
                }
            })
            setDependantSonData(sd)
        }
        if (familyMember.dependantDaughter !== "") {
            dummySonDaughterCount.map((value, index) => {
                if (index < familyMember.dependantDaughterCount) {
                    dd.push({
                        name: 'dependant Daughter ' + (index + 1),
                        gender: '',
                        date: ''
                    })
                }
            })
            setDependantDaughterData(dd)
        }


    }, [])

    const handleSelfChange = (e) => {
        setSelfData({
            ...selfData,
            gender: e.target.value
        })
    }
    const onSelfDateChange = (e) => {
        setSelfData({
            ...selfData,
            date: e.target.value
        })
    }
    const handleSpouseChange = (e) => {
        setSpouseData({
            ...spouseData,
            gender: e.target.value
        })
    }
    const onSpouseDateChange = (e) => {
        setSpouseData({
            ...spouseData,
            date: e.target.value
        })
    }
    const handleDependantSonGenderChange = (e, index) => {
        const indexs = e.target.name;
        setDependantSonData(s => {
            const dependantSonData = s.slice();
            dependantSonData[indexs].gender = e.target.value;
            return dependantSonData;
        });
    }
    const handleDependantSonDateChange = (e, index) => {
        const indexs = e.target.name;
        setDependantSonData(s => {
            const dependantSonData = s.slice();
            dependantSonData[indexs].date = e.target.value;
            return dependantSonData;
        });
    }
    const handleDependantDaughterGenderChange = (e, index) => {
        const indexs = e.target.name;
        setDependantDaughterData(s => {
            const dependantDaughterData = s.slice();
            dependantDaughterData[indexs].gender = e.target.value;
            return dependantDaughterData;
        });
    }
    const handleDependantDaughterDateChange = (e, index) => {
        const indexs = e.target.name;
        setDependantDaughterData(s => {
            const dependantDaughterData = s.slice();
            dependantDaughterData[indexs].date = e.target.value;
            return dependantDaughterData;
        });
    }
    const onMemberProceed = () => {
        const megerObj = { ...dependantSonData, ...dependantDaughterData };

        let finalData = []
        if (selfData.gender !== "" || selfData.date !== "") {
            finalData.push({
                name: "self",
                phone: phone,
                email: email,
                gender: selfData.gender,
                date: selfData.date
            })
        }
        if (spouseData.gender !== "" || spouseData.date !== "") {
            finalData.push({
                name: "Spouse",
                phone: phone,
                email: email,
                gender: spouseData.gender,
                date: spouseData.date
            })
        }
        if (dependantSonData && dependantSonData.length > 0) {
            dependantSonData.map((val) => {
                if (val.gender !== "" || val.date !== "") {
                    finalData.push({
                        name: val.name,
                        phone: phone,
                        email: email,
                        gender: val.gender,
                        date: val.date
                    })
                }
            })
        }
        if (dependantDaughterData && dependantDaughterData.length > 0) {
            dependantDaughterData.map((val) => {
                if (val.gender !== "" || val.date !== "") {
                    finalData.push({
                        name: val.name,
                        phone: phone,
                        email: email,
                        gender: val.gender,
                        date: val.date
                    })
                }
            })
        }

        console.log("megerObj", megerObj, finalData);
        dispatch(addTodo(finalData));
        setShowTaskList(true)
    }
    const onBack = () => {
        props.onBackButtonChange()
    }

    console.log("dependantSonData", selfData, spouseData, dependantSonData, dependantDaughterData);
    return (

        <Box sx={{width:'100%'}}>
           {!showTaskList ?
            <Box sx={{width:'100%'}}>
                {familyMember.self !== "" ? <Grid container spacing={2} sx={{ mb: 2, mt: 2 }} >
                    <Grid item xs={4}>
                        Self
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selfData.gender} 
                                label="Gender"
                                onChange={handleSelfChange}
                            >
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            type="date"
                            id="outlined-basic"
                            label="Date"
                            variant="outlined"
                            name={selfData.date} 
                            value={selfData.date === "" ? new Date() : selfData.date }
                            onChange={onSelfDateChange}
                        />
                    </Grid>
                </Grid> : null}
                {familyMember.spouse !== "" ? <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                    <Grid item xs={4}>
                        Spouse
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={spouseData.gender}
                                label="Gender"
                                onChange={handleSpouseChange}
                            >
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            type="date"
                            id="outlined-basic"
                            label="Date"
                            variant="outlined"
                            value={spouseData.date === "" ? new Date() : spouseData.date }
                            onChange={onSpouseDateChange}
                        />
                    </Grid>
                </Grid> : null}
                {familyMember.dependantSon !== "" ? (familyMember.dependantSonCount === dependantSonData.length) ?
                    dummySonDaughterCount.map((value, index) => {
                        if (index < familyMember.dependantSonCount) {
                            return (
                                <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>

                                    <Grid item xs={4}>
                                        dependant Son {index + 1}
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={dependantSonData[index].gender}
                                                name={index}
                                                label="Gender"
                                                onChange={(e) => handleDependantSonGenderChange(e, index)}
                                            >
                                                <MenuItem value={"male"}>Male</MenuItem>
                                                <MenuItem value={"female"}>Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            type="date"
                                            id="outlined-basic"
                                            label="Date"
                                            name={index}
                                            variant="outlined"
                                            value={dependantSonData[index].date !== "" ? dependantSonData[index].date : new Date()}
                                            onChange={(e) => handleDependantSonDateChange(e, index)}
                                        />
                                    </Grid>
                                </Grid>)
                        }
                    }) : null : null}
                {familyMember.dependantDaughter !== "" ? (familyMember.dependantDaughterCount === dependantDaughterData.length) ?
                    dummySonDaughterCount.map((value, index) => {
                        if (index < familyMember.dependantDaughterCount) {
                            return (
                                <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                                    <Grid item xs={4}>
                                        Dependant Daughter {index + 1}
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={dependantDaughterData[index].gender}
                                                name={index}
                                                label="Gender"
                                                onChange={(e) => { handleDependantDaughterGenderChange(e, index) }}
                                            >
                                                <MenuItem value={"male"}>Male</MenuItem>
                                                <MenuItem value={"female"}>Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            type="date"
                                            id="outlined-basic"
                                            label="Date"
                                            variant="outlined"
                                            name={index}
                                            value={dependantDaughterData[index].date !== "" ? dependantDaughterData[index].date : new Date()}
                                            onChange={(e) => { handleDependantDaughterDateChange(e, index) }}
                                        />
                                    </Grid>
                                </Grid>
                            )
                        }
                    }) : null : null}

                <Box sx={{ display: 'flex', marginTop: "2rem" }}>
                    <Button variant="outlined" sx={{mr:1 }} onClick={onBack} >Back</Button>
                    <Button variant="contained" onClick={onMemberProceed} >Proceed</Button>
                </Box>
            </Box> : <TaskList />}
        </Box >
    )



}

export default FamilyMemberDetails;