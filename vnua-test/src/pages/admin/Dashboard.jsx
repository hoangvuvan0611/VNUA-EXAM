import { Button, Container, Grid2, Typography, Box } from "@mui/material";
import { red } from "@mui/material/colors";
import { Card, CardContent, CardHeader } from "@mui/material";
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import logoWorking from '../../assets/images/logos/Working-bro.svg';

import React from "react";
import MyAppBar from "../../components/admin/appbar/MyAppBar";
import { useTheme } from '@mui/material/styles';

const Dashboard = () => {

    const theme = useTheme();

    return (
        <div className="dashboard" style={{position: 'relative', backgroundColor: theme.palette.background.default}}>
            <div className="shadow-sm" style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 39 }}>
                <MyAppBar label={'Trang tổng quan'}/>
            </div>

            {/* Welcome Section */}
            <Grid2 sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgb(224, 255, 226, 0.3)' : 'rgb(224, 255, 226)', height: 200, borderRadius: 2, p: 3, display: 'flex', 
                alignItems: 'center', mt: 4, mb: 4, position: 'relative', ml: 3, mr: 3 }}>
                <Grid2 sx={{marginLeft: 10, xs: 12, md: 3}}>
                    <Typography variant="h4" fontWeight="bold">Chào, Hoàng</Typography>
                    <Typography variant="subtitle1" color="textSecondary">Sẵn sàng để hoàn thành công việc của bạn ngày hôm nay?</Typography>
                </Grid2>
                <Grid2 component="img" src={logoWorking} alt="Illustration" className="sm-hide"
                sx={{ width: 300, marginLeft: 'auto', position: '', right: 10, xs: 12, md: 6, marginRight: 10}}/>
            </Grid2>

            {/* Main content: Responsive */}
            <div className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64">
                {/* Header - responsive */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 pt-14 lg:pt-0">
                <Card className="w-full md:w-2/3 lg:w-1/3">
                        <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                            <p className="text-sm text-gray-500">Good Morning, Ariel</p>
                            <p className="text-2xl font-bold">10:29 am</p>
                            </div>
                            <img src="/api/placeholder/100/100" alt="Illustration" className="w-16 h-16" />
                        </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full md:w-1/3 lg:w-1/4">
                        <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <EventNoteIcon className="h-8 w-8 text-blue-500" />
                            <div className="text-right">
                            <p className="text-2xl font-bold">26°</p>
                            <p className="text-sm text-gray-500">Heavy Rain</p>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Task board - responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Open task */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Open</h3>
                        <div className="space-y-4">
                        {[1, 2, 3].map((task) => (
                            <Card key={task} className="bg-white">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">#{task} Lead-Up</span>
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-100"></div>
                                    <div className="w-6 h-6 rounded-full bg-green-100"></div>
                                </div>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm">
                                <span className="mr-2">Comments: 2</span>
                                <span>Attachments: 1</span>
                                </div>
                            </CardContent>
                            </Card>
                        ))}
                        <button className="w-full p-2 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                            <AddCircleOutlineIcon className="h-5 w-5 mr-2" />
                            Add Card
                        </button>
                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Open task */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Open</h3>
                        <div className="space-y-4">
                        {[1, 2, 3].map((task) => (
                            <Card key={task} className="bg-white">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">#{task} Lead-Up</span>
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-100"></div>
                                    <div className="w-6 h-6 rounded-full bg-green-100"></div>
                                </div>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm">
                                <span className="mr-2">Comments: 2</span>
                                <span>Attachments: 1</span>
                                </div>
                            </CardContent>
                            </Card>
                        ))}
                        <button className="w-full p-2 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                            <AddCircleOutlineIcon className="h-5 w-5 mr-2" />
                            Add Card
                        </button>
                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Open task */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Open</h3>
                        <div className="space-y-4">
                        {[1, 2, 3].map((task) => (
                            <Card key={task} className="bg-white">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">#{task} Lead-Up</span>
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-100"></div>
                                    <div className="w-6 h-6 rounded-full bg-green-100"></div>
                                </div>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm">
                                <span className="mr-2">Comments: 2</span>
                                <span>Attachments: 1</span>
                                </div>
                            </CardContent>
                            </Card>
                        ))}
                        <button className="w-full p-2 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                            <AddCircleOutlineIcon className="h-5 w-5 mr-2" />
                            Add Card
                        </button>
                        </div>
                    </div>

                </div>
            </div>    
        </div>
    );
}

export default Dashboard;