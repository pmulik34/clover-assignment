import { useEffect } from "react";
import { useState } from "react";
import PolicyList from "./PolicyList";
import { useDispatch } from "react-redux";
import { addpolicy } from "./policySplice";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const dependantSonDetails = [{
    name: '',
    gender: '',
    date: ''
}];
const dependantDaughterDetails = [{
    name: '',
    gender: '',
    date: ''
}];
const ChooseMembers = (props) => {
    const { familyMember, email, parentMember, phone } = props;
    const dispatch = useDispatch();

    const [dependantdependantSonDetails, setDependantdependantSonDetails] = useState(dependantSonDetails)
    const [dependantdependantDaughterDetails, setDependantdependantDaughterDetails] = useState(dependantDaughterDetails)
    const siblingsCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [policyList, setpolicyList] = useState(false)
    const [selfDetails, setSelfDetails] = useState({ name: 'self', gender: '', date: '' })
    const [spouseDetails, setSpouseDetails] = useState({name: 'spouse', gender: '', date: ''})


    useEffect(() => {
        const createDependantDetails = (prefix, count) =>
          Array.from({ length: count }, (_, index) => ({
            name: `${prefix} ${index + 1}`,
            gender: '',
            date: ''
          }));
      
        if (familyMember.dependantSon !== "") {
          const dependantSonDetails = createDependantDetails('dependant Son', familyMember.dependantSonCount);
          setDependantdependantSonDetails(dependantSonDetails);
        }
      
        if (familyMember.dependantDaughter !== "") {
          const dependantDaughterDetails = createDependantDetails('dependant Daughter', familyMember.dependantDaughterCount);
          setDependantdependantDaughterDetails(dependantDaughterDetails);
        }
      }, []);
      

    const handleSelfGender = (e) => {
        setSelfDetails({
            ...selfDetails,
            gender: e.target.value
        })
    }
    const handleSelfDateChange = (e) => {
        setSelfDetails({
            ...selfDetails,
            date: e.target.value
        })
    }
    const handleSpouseChange = (e) => {
        setSpouseDetails({
            ...spouseDetails,
            gender: e.target.value
        })
    }
    const onSpouseDateChange = (e) => {
        setSpouseDetails({
            ...spouseDetails,
            date: e.target.value
        })
    }
    const handleDependantSonGenderChange = (e, index) => {
        const { name, value } = e.target;
        setDependantdependantSonDetails((prevState) => {
          const updatedDetails = [...prevState];
          updatedDetails[name].gender = value;
          return updatedDetails;
        });
      };
      
      const handleDependantSonDateChange = (e, index) => {
        const { name, value } = e.target;
        setDependantdependantSonDetails((prevDetails) => [
          ...prevDetails.slice(0, index),
          { ...prevDetails[index], date: value },
          ...prevDetails.slice(index + 1)
        ]);
      };
      
      const handleDependantDaughterGenderChange = (e, index) => {
        const { name, value } = e.target;
        setDependantdependantDaughterDetails((prevDetails) => [
          ...prevDetails.slice(0, index),
          { ...prevDetails[index], gender: value },
          ...prevDetails.slice(index + 1)
        ]);
      };
      
      const handleDependantDaughterDateChange = (e, index) => {
        const { name, value } = e.target;
        setDependantdependantDaughterDetails((prevDetails) => [
          ...prevDetails.slice(0, index),
          { ...prevDetails[index], date: value },
          ...prevDetails.slice(index + 1)
        ]);
      };
      
      const onMemberProceed = () => {
        const mergedDetails = { ...dependantdependantSonDetails, ...dependantdependantDaughterDetails };
      
        const createMemberData = (details, memberType) => {
          return details
            .filter((val) => val.gender !== "" || val.date !== "")
            .map((val) => ({
              name: val.name,
              phone: phone,
              email: email,
              gender: val.gender,
              date: val.date,
            }));
        };
      
        const finalData = [
          ...(selfDetails.gender !== "" || selfDetails.date !== ""
            ? [
                {
                  name: "self",
                  phone: phone,
                  email: email,
                  gender: selfDetails.gender,
                  date: selfDetails.date,
                },
              ]
            : []),
          ...(spouseDetails.gender !== "" || spouseDetails.date !== ""
            ? [
                {
                  name: "Spouse",
                  phone: phone,
                  email: email,
                  gender: spouseDetails.gender,
                  date: spouseDetails.date,
                },
              ]
            : []),
          ...createMemberData(dependantdependantSonDetails, 'dependant Son'),
          ...createMemberData(dependantdependantDaughterDetails, 'dependant Daughter'),
        ];
      
        console.log("mergedDetails", mergedDetails, finalData);
        dispatch(addpolicy(finalData));
        setpolicyList(true);
      };
      
    const onBack = () => {
        props.onBackButtonChange()
    }
    // console.log("dependantdependantSonDetails", selfDetails, spouseDetails, dependantdependantSonDetails, dependantdependantDaughterDetails);
    return (
        <Box sx={{ width: '100%' }}>
            {!policyList ?
                <Box sx={{ width: '100%' }}>
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
                                    value={selfDetails.gender}
                                    label="Gender"
                                    onChange={handleSelfGender}
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
                                name={selfDetails.date}
                                value={selfDetails.date === "" ? new Date() : selfDetails.date}
                                onChange={handleSelfDateChange}
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
                                    value={spouseDetails.gender}
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
                                value={spouseDetails.date === "" ? new Date() : spouseDetails.date}
                                onChange={onSpouseDateChange}
                            />
                        </Grid>
                    </Grid> : null}
                    {familyMember.dependantSon !== "" ? (familyMember.dependantSonCount === dependantdependantSonDetails.length) ?
                        siblingsCount.map((value, index) => {
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
                                                    value={dependantdependantSonDetails[index].gender}
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
                                                value={dependantdependantSonDetails[index].date !== "" ? dependantdependantSonDetails[index].date : new Date()}
                                                onChange={(e) => handleDependantSonDateChange(e, index)}
                                            />
                                        </Grid>
                                    </Grid>)
                            }
                        }) : null : null}
                    {familyMember.dependantDaughter !== "" ? (familyMember.dependantDaughterCount === dependantdependantDaughterDetails.length) ?
                        siblingsCount.map((value, index) => {
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
                                                    value={dependantdependantDaughterDetails[index].gender}
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
                                                value={dependantdependantDaughterDetails[index].date !== "" ? dependantdependantDaughterDetails[index].date : new Date()}
                                                onChange={(e) => { handleDependantDaughterDateChange(e, index) }}
                                            />
                                        </Grid>
                                    </Grid>
                                )
                            }
                        }) : null : null}

                    <Box sx={{ display: 'flex', marginTop: "2rem" }}>
                        <Button variant="outlined" sx={{ mr: 1 }} onClick={onBack} >Back</Button>
                        <Button variant="contained" onClick={onMemberProceed} >Proceed</Button>
                    </Box>
                </Box> : <PolicyList />}
        </Box >
    )
}

export default ChooseMembers;