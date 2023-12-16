import { useEffect, useState } from "react";
import { Box, Button, TextField, Container, Card, IconButton } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import Person2Icon from '@mui/icons-material/Person2';
import Person3Icon from '@mui/icons-material/Person3';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Helper from "./components/FormHelper";
import ChooseMembers from "./components/ChooseMembers";
import PersonIcon from '@mui/icons-material/Person';
import MemberCard from "../src/components/MemberCard";

const App = () => {
  const [parentMember, setParentMember] = useState('')
  const [parentMemberError, setParentMemberError] = useState('')
  const [familyMember, setFamilyMember] = useState({
    self: "",
    spouse: "",
    dependantSon: "",
    dependantSonCount: 1,
    dependantDaughter: "",
    dependantDaughterCount: 1
  })
  const [dependantSonCount, setDependantSonCount] = useState(1);
  const [dependantDaughterCount, setDependantDaughterCount] = useState(1);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState("");
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState("");
  const [showMemberDetails, setShowMemberDetails] = useState(false);

  useEffect(() => {
    if (familyMember.self === "self") {
      setFamilyMember((prevState) => {
        return {
          ...prevState,
          self: familyMember.self,
        };
      })
    }
    if (familyMember.spouse === "spouse") {
      setFamilyMember((prevState) => {
        return {
          ...prevState,
          spouse: familyMember.spouse,
        };
      })
    }
    if (familyMember.dependantSon === "dependantSon") {
      setFamilyMember((prevState) => {
        return {
          ...prevState,
          dependantSon: familyMember.dependantSon,
        };
      })
    }
    if (familyMember.dependantDaughter === "dependantDaughter") {
      setFamilyMember((prevState) => {
        return {
          ...prevState,
          dependantDaughter: familyMember.dependantDaughter,
        };
      })
    }

  }, [])
  const onClickmember = (val) => {
    if (val === 'self') {
      setParentMember('self');
    } else {
      setParentMember('family');
    }
  }
  const onClickFamilyMember = (val, e) => {
    console.log("val-->", val,e );
    console.log("val", val,e.target.checked );
    setFamilyMember((prevState) => {
      if (val === "self") {
        return {
          ...prevState,
          self: !e.target.checked  ? "" : val,
        };
      } else if (val === "spouse") {
        return {
          ...prevState,
          spouse: !e.target.checked  ? "" : val,
        };
      } else if (val === "dependantSon") {
        return {
          ...prevState,
          dependantSon: !e.target.checked  ? "" : val,
        };
      } else if (val === "dependantDaughter") {
        return {
          ...prevState,
          dependantDaughter: !e.target.checked   ? "" : val,
        };
      }
    });
  }
  const handlePhone = (e) => {
    if (e.target.value.length <= 10) {
      const phone = e.target.value.trim()
      setPhone(phone);
      console.log("Helper.isValidphone(phone)",Helper.isValidphone(phone));
      if (!Helper.isValidphone(phone)) {
        setPhoneError('Please enter valid Mobile Number')
      } else {
        setPhoneError('')
      }
      console.log(e.target.value);
    }
  }
  const validateEmail = (e) => {
    const email = e.target.value.trim();
    setEmail(email)
    if (!Helper.validEmail(email)) {
      setEmailError('Please enter valid email')
    } else {
      setEmailError('')
    }
  }
  const onMemberProceed = () => {
    if (parentMember.trim() === "") {
      setParentMemberError("Please Select member");
      return false;
    }
    if (phone.trim() === "" || phone.trim().length < 10) {
      setPhoneError("Please Enter 10 digit number")
      return false;
    }
    if (email.trim() === "") {
      setEmailError('Please enter valid email')
      return false;
    } else {
      if (parentMember === "self") {
        setFamilyMember((prevState) => {
          return {
            ...prevState,
            self: "self",
          };
        })
      }
      setFamilyMember((prevState) => {
        return {
          ...prevState,
          dependantSonCount: dependantSonCount,
          dependantDaughterCount: dependantDaughterCount,
        };
      })
      setShowMemberDetails(true)
    }
  }
  const onFamilyMemberProceed = () => {

  }
  const onBackButtonChange = () => {
    setShowMemberDetails(false)
  }

  console.log("familyMember", familyMember);

  return (
    <Container className="task-component"
      sx={{
        marginTop: "20px",
        padding: 2,
        display: "flex",
        FlexDirection: "column",
        jistifyItems: "center",
        justifyContent: "center",
        height: "100%",

      }}
    >
      {!showMemberDetails ? <div className="add-task"
        sx={{
          display: "fex",
          justifyContent: "center",
          width:"150px",
          border:"1px solid #000",
          height: "100%",
          gap: "23px"
        }}
      >
        <Box sx={{
          width: "100%",
          marginTop: "23px",
          display: "flex",
          alignItems: "center",
          gap: "40px",
          justifyContent: "center"
        }}>

          <MemberCard
            memberName={"Self"}
            icon={<PersonIcon />}
            onClickHandler={() => { onClickmember('self') }}
            selected={parentMember === "self" ? true : false}
          />
          <MemberCard
            memberName={"Family"}
            icon={<GroupIcon />}
            onClickHandler={() => { onClickmember('family') }}
            selected={parentMember === "family" ? true : false}
          />
        </Box>
        {parentMember === "family" ?
          <Box
            sx={{
              width: "100%",
              paddingTop: "5%",
              marginTop: "40px",
              marginBottom: "23px",
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              margin: "0 auto"
            }}
          >

            <MemberCard
              memberName={"Self"}
              values={"self"}
              icon={<PersonIcon />}
              onClickHandler={onClickFamilyMember}
              selected={familyMember.self === "self" ? true : false}
            />
            <MemberCard
              memberName={"Spouse"}
              values={"spouse"}
              icon={<Person2Icon />}
              onClickHandler={onClickFamilyMember}
              selected={familyMember.spouse === "spouse" ? true : false}
            />
            <Box>
              <MemberCard
                memberName={"Dependant Son"}
                values={"dependantSon"}
                icon={<PersonIcon />}
                onClickHandler={onClickFamilyMember}
                selected={familyMember.dependantSon === "dependantSon" ? true : false}
                />
              <Card
                style={{
                  border: "1px solid #c9c9c9",
                  width: '80px',
                  height: "20px",
                  padding: "12px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "12px",
                  gap: "6px",
                  boxShadow:'none'
                }}>
                <IconButton onClick={(e) => setDependantSonCount(dependantSonCount <= 1 ? 1 : (dependantSonCount - 1))}>
                  <RemoveCircleOutlineIcon /></IconButton>
                <Box
                  sx={{
                    border: "none",
                    p: '4px',
                    width: "50px"
                  }}>
                  {dependantSonCount}
                </Box>
                <IconButton onClick={() => setDependantSonCount(dependantSonCount + 1)} >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Card>
            </Box>
            <Box>
              <MemberCard
                memberName={"Dependant Daughter"}
                values={"dependantDaughter"}
                icon={<Person3Icon />}
                onClickHandler={onClickFamilyMember}
                selected={familyMember.dependantDaughter === "dependantDaughter" ? true : false}
              />
              <Card
                style={{
                  border: "1px solid #c9c9c9",
                  width: '80px',
                  height: "20px",
                  padding: "12px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "12px",
                  gap: "6px",
                  boxShadow:'none'
                }}>
                <IconButton onClick={() => setDependantDaughterCount(dependantDaughterCount <= 1 ? 1 : (dependantDaughterCount - 1))}>
                  <RemoveCircleOutlineIcon /></IconButton>
                  <Box
                  sx={{
                    border: "none",
                    p: '4px',
                    width: "50px",
                  }}>
                  {dependantDaughterCount}
                </Box>
                <IconButton onClick={() => setDependantDaughterCount(dependantDaughterCount + 1)} >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Card>
            </Box>
          </Box> : null}
        {(parentMember === "family" || parentMember === "self") ? <Box sx={{marginTop: '2rem'}}>
        <b>Personal Details</b>
          <Box
            component="div"
            sx={{
              paddingTop: '2%',
              '& > :not(style)': {  width: '25ch' },
              width: '100%',
              display: "flex",
              justifyContent: "space-between",
              marginInlineEnd: '1rem',
            }}
          > 
            <TextField
              type="number"
              id="outlined-basic"
              label="Mobile No.(10 digit)"
              variant="outlined"
              onChange={handlePhone}
              error={phoneError.length > 0 ? true : false}
              value={phone}
              helperText={phoneError.length > 0 ? phoneError : ""}
            />
            <TextField
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              onChange={validateEmail}
              // onBlur={validateEmail}
              error={emailError.length > 0 ? true : false}
              value={email}
              helperText={emailError.length > 0 ? emailError : ""}
            />
          </Box>
          <Box
            component="div"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
              textAlign: "end"
            }}
          >
            <Button sx={{ background: '#FF6458' }} variant="contained" onClick={onMemberProceed}>Proceed</Button>
          </Box>
        </Box> : null}

      </div>
        :
        <div>
          <ChooseMembers
            parentMember={parentMember}
            familyMember={familyMember}
            phone={phone}
            email={email}
            onBackButtonChange={onBackButtonChange}
            onProceed={onFamilyMemberProceed}
          />
        </div>
      }
    </Container>
  );
};

export default App;
