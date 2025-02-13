import React, {useState, useEffect, useRef} from 'react';
import {
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    TextField,
    Grid,
    Box,
    Toolbar, Typography
} from '@mui/material';
import 'flatpickr/dist/themes/material_blue.css';
import BasicLayout from "../layouts/BasicLayout";
import axios from "axios";



const SearchPage = (props) =>{


    const [selectedProject, setSelectedProject] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const [selectedSourceCd, setSelectedSourceCd] = useState('');
    const [dataType, setDataType] = useState('');
    const [isTestset, setIsTestset] = useState('');
    const [selectedOrigin, setSelectedOrigin] = useState('');
    const [selectedPcbBoard, setSelectedPcbBoard] = useState('');
    const [date, setDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [imageTitle, setImageTitle] = useState('');
    const [totalItems, setTotalItems] = useState(0);


    const fetchArticles = (page) => {
        console.log(`Fetching articles for page ${page}`);
    };


    const types = [
        { value: "pcb", text: "PCB" },
        { value: "ocr", text: "OCR" },
        { value: "surface", text: "surface" },
        { value: "soldering", text: "soldering" },
        { value: "pattern_matching", text: "pattern_matching" },
        { value: "barcode", text: "barcode" },
    ];

    const [projects, setProjects] = useState([]);
    const [origins, setOrigins] = useState([]);
    const [sorts, setSorts] = useState([]);
    const [sources, setSources] = useState([]);
    const [pcbBoards, setPcbBoards] = useState([]);


    // 연결 수립 가능한지, 이미지 관련 상태관리
    const [connectip, setIp] = useState('10.0.0.1');
    const [connectport, setPort] = useState('5001');
    const [receiveConnect, setConnectMessage] = useState('');

    const [imagepath, setImagePath] = useState('');
    const [receiveGetImage, setGetImageMessage] = useState('');
    const [imageName, setImageName] = useState('');

    const [sendFieldMessage, setMessage] = useState('');
    const [sendFieldData, setData] = useState('');
    const [receiveGet, setGetMessage] = useState('');
    const [receivePost, setPostMessage] = useState('');
    const [jsonResponse, setJsonResponse] = useState(null);

    const fileInputRef = useRef(null);

    const handleConnect = async () => {

    }

    const handleDisconnect = async () => {

    }

    const handleGetImage = async () => {
        fileInputRef.current.click();
    }


    // 반입 규정으로 인한 기능 제작 보류
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImagePath(file.name);

    }

    const sendData = async () => {

    }


    const getBaseData = () => {
        axios.get('')
            .then((response) => {
                const data = response.data;
                console.log(JSON.stringify(data))
                
                // 프로젝트 명 삽입
                const newPr = data.project.map(item => ({
                        value : item[0],
                        text : item[1]
                    })
                )
                setProjects(newPr);
                    

                // 오리진 명 삽입
                const newOrigin = data.origin.map(item => ({
                        value : item[0],
                        text : item[1]
                    })
                )
                setOrigins(newOrigin);


                // 소트 명 삽입
                const newSort = data.sort.map(item => ({
                        value : item[0],
                        text : item[1]
                    })
                )
                setSorts(newSort);
                
                // 소스 명 삽입
                const newSource = data.source.map(item => ({
                        value : item[0],
                        text : item[1]
                    })
                )
                setSources(newSource)

                // PCB 명 삽입
                const newPCB = data.pcb_board.map(item => ({
                        value : item[0],
                        text : item[1]
                    })
                )
                setPcbBoards(newPCB);



            })
            .catch((error) => {
                console.error('Error fetching base data:', error);
            });
    };



    useEffect(()=>{
        getBaseData();
    },[]);

    return (
        <BasicLayout props={props}>
            <Box component="main" sx={{ p: 2,
                marginTop: '60px',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Toolbar />
                <Card>
                    <h2 className="font-weight-bolder" style={{
                        marginLeft: '15px'
                    }}>DBMS Data Search</h2>
                    <CardContent>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <h5 className="font-weight-bolder">Project</h5>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="project-label"
                                        id="choices-project"
                                        value={selectedProject}
                                        onChange={(e) => setSelectedProject(e.target.value)}
                                        sx={{ width:'740px' }}
                                    >
                                        {projects.map((project, index) => (
                                            <MenuItem key={index} value={project.value}>
                                                {project.text}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <h5 className="font-weight-bolder">Sort</h5>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="sort-label"
                                        id="choices-sort"
                                        value={selectedSort}
                                        onChange={(e) => setSelectedSort(e.target.value)}
                                        sx={{ width:'740px' }}
                                    >
                                        {/* 예시 정렬 데이터 */}
                                        {sorts.map((sort, index) => (
                                            <MenuItem key={index} value={sort.value}>
                                                {sort.text}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <h5 className="font-weight-bolder">source</h5>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="source-label"
                                        id="choices-source"
                                        value={selectedSourceCd}
                                        onChange={(e) => setSelectedSourceCd(e.target.value)}
                                        sx={{ width:'740px'}}
                                    >
                                        {sources.map((source, index) => (
                                            <MenuItem key={index} value={source.value}>
                                                {source.text}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <h5 className="font-weight-bolder">type</h5>
                                <FormControl component="fieldset">
                                    <RadioGroup row value={dataType} onChange={(e) => setDataType(e.target.value)}>

                                        {types.map((type, index) => (
                                            <FormControlLabel
                                                key={index}
                                                value={type.value}
                                                control={<Radio/>}
                                                label={type.text}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <h5 className="font-weight-bolder">테스트 데이터 여부</h5>
                                <FormControl component="fieldset">
                                    <RadioGroup row value={isTestset} onChange={(e) => setIsTestset(e.target.value)}>
                                        <FormControlLabel value="1" control={<Radio/>} label="O"/>
                                        <FormControlLabel value="0" control={<Radio/>} label="X"/>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <h5 className="font-weight-bolder">origin</h5>
                                    <Select
                                        labelId="origin-label"
                                        id="choices-origin"
                                        value={selectedOrigin}
                                        onChange={(e) => setSelectedOrigin(e.target.value)}
                                        sx={{ minWidth: '200px' }}
                                    >

                                        {origins.map((origin, index) => (
                                            <MenuItem key={index} value={origin.value}>
                                                {origin.text}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <h5 className="font-weight-bolder">Pcb Board</h5>
                                    <Select
                                        labelId="pcb-board-label"
                                        id="choices-pcb_board"
                                        value={selectedPcbBoard}
                                        onChange={(e) => setSelectedPcbBoard(e.target.value)}
                                        sx={{ minWidth: '200px' }}
                                    >

                                        {pcbBoards.map((pcbBoard, index) => (
                                            <MenuItem key={index} value={pcbBoard.value}>
                                                {pcbBoard.text}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth>
                                    <h5 className="font-weight-bolder">취득일 Date 범위</h5>
                                    <TextField

                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth>
                                    <h5 className="font-weight-bolder">취득일 Date 범위</h5>
                                    <TextField

                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <h5 className="font-weight-bolder">이미지 업로드</h5>
                                <TextField
                                    fullWidth
                                    placeholder="이미지 주소"
                                    value={imagepath}
                                    onChange={(e) => setImagePath(e.target.value)}
                                    style={{marginBottom: 8}}
                                />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <input type={"file"} style={{display: 'none'}} ref={fileInputRef}
                                           onChange={handleFileChange}/>
                                    <Button variant="outlined" color="primary" onClick={handleGetImage} sx={{
                                        marginTop : '20px',
                                    }}>이미지 파일 갖고 오기</Button>

                                </div>
                                <Typography variant="body1" sx={{
                                    marginTop : '30px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>Result of Get Image: {receiveGetImage}</Typography>
                                {imageName && <img src={imageName} />}
                            </Grid>


                            <Grid item xs={12}>
                                <h5 className="font-weight-bolder">파일명 포함 검색</h5>
                                <TextField
                                    fullWidth
                                    placeholder="파일명 검색"
                                    value={imageTitle}
                                    onChange={(e) => setImageTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} className="mt-4">
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Button variant="outlined" color="primary" onClick={() => fetchArticles(1)}>
                                        검색
                                    </Button>
                                </div>
                            </Grid>



                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </BasicLayout>
    );
}


export default SearchPage;

