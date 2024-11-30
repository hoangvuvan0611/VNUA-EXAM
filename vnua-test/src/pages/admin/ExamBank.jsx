import React from "react";
import MyAppBar from "../../components/admin/appbar/MyAppBar";

const ExamBank = () => {
    return (
        <div className="bg-white" style={{position: 'relative'}}>
            <div className="shadow-sm bg-white" style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 39 }}>
                <MyAppBar label={'Quản lý đề thi'}/>
            </div>
        </div>
    );
}

export default ExamBank;