import React, { useMemo, useState} from 'react';

import '/resources/css/Test.css'
import PassMemForm from "./Index/PassMemForm.jsx";
import PassMemList from "./Index/PassMemList.jsx";

const Test = ({items}) => {
    const [passMems, setPassMems] = useState([]);

    useMemo(() => {
        setPassMems(items)
    }, [items]);

    return (
        <div style={{padding: '20px'}}>
            <h1>PassMem App</h1>
            <PassMemForm setPassMems={setPassMems} passMems={passMems} />
            <PassMemList setPassMems={setPassMems} passMems={passMems}/>
        </div>
    );
};

export default Test;
