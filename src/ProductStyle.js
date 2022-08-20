export const prodList = {
    button_grp: {
        bgcolor: '#fbf2ff',
        color: '#7009AB' ,
        borderColor:'#ddd',
        margin: '1px' ,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: '12px' ,
    },
    select_input:{
        "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #B97DF0",
        },
    },
    select_formcontrol:{
        m: 1,
        borderRadius: 2,
    },
    delete_btn:{
        backgroundColor: "#f5365c",
        borderColor: "#f41e48",
        fontSize: 10,
        "&:hover": {
            backgroundColor: "#f50e3c",
            color: "#fff",
        },
    },
    addtolocation_btn:{
        backgroundColor: "#2dce89",
        borderColor: "#28b97b",
        fontSize: 10,
        "&:hover": {
            backgroundColor: "#209764",
            color: "#fff",
        },
    },
    remove_btn:{
        backgroundColor: "#001f3f",
        borderColor: "#001f3f",
        fontSize: 10,
        "&:hover": {
            backgroundColor: "#14477c",
            color: "#fff",
        },
    },
    deactive_btn:{
        backgroundColor: "#ffad46",
        borderColor: "#ffa22d",
        fontSize: 10,
        "&:hover": {
            backgroundColor: "#ff8e00",
            color: "#fff",
        },
    },
    viewbtn:{
        fontSize: 9, 
        padding: "2px 1px",
        borderColor: "#7009AB", 
        color: "#7009AB",
        "&:hover": {
            backgroundColor: "#7009AB",
            color: "#fff",
            borderColor: "#7009AB",
        },

    },
    tabpanel:{
        padding: 0, 
        pt: 3 
    },
    tab:{
        color: "#7009AB",
        "&.MuiTabs-indicator": {
            backgroundColor: "#7009AB",
            borderColor: "#7009AB",
        },
        "&.Mui-selected": {
            color: "#7009AB",
            borderColor: "#7009AB",
            backgroundColor: "#efecec",
        },
    },   
    add:{
        float: "right",
        width: "97px",
        fontWeight: 600,
        mr: 1,
        backgroundColor: "#7009AB",
         mt: -5,
         color:"#A5BECC",
         "&:hover":{
            backgroundColor: "#fff",
            border: "1px solid #7009AB",
            color: "#7009AB",
         }
    },
    actionsdropdown:{
        backgroundColor:"#b97df0",
        fontSize: 11,
        "&:hover":{
            backgroundColor: "#fff",
            color: "#b97df0"
        }
    },
}

export const prodStyle = {
    prod_container : {
        bgcolor: '#fff',
        height: 'max-content',
        borderTop: '5px solid #7009AB;',
        borderLeft: '0px',
        borderRight: '0px',
        borderBottom: '0px',
        borderRadius: '10px',
        boxShadow: '6px 6px 6px 9px #dedbdbae',
    },
    prod_uploadbtn : {
        border:'1px solid #B97DF0 !important',
        borderRadius: '7px !important',
        width: '159px !important',
        fontSize: '11px !important',
        color: '#7009AB !important',
        fontWeight: '600 !important',
            '&:hover' : {
                backgroundColor: '#7009AB !important',
                color: '#fff !important',
            },
    },
    prod_tablehd : {
        backgroundColor: '#7009AB !important',
        fontSize: '20px !important',
        color: '#fff !important',
    },
    prod_saveadd : {
        border: '1px solid #7009AB !important',
        color: '#7009AB !important',
        marginRight: '5px !important',
        height: '40px !important',
        padding: '10px !important',
        fontWeight: '600 !important',
        borderRadius: '7px !important',
        '&:hover' : {
            backgroundColor: '#7009AB !important',
            border: '0px !important',
            color: '#fff !important',
        },
    },
    prod_save : {
        border: '1px solid #7009AB !important',
        color: '#7009AB !important',
        height: '40px !important',
        fontWeight: '600 !important',
        borderRadius: '7px !important',
        width: '80px',
        '&:hover' : {
            backgroundColor: '#7009AB !important',
            border: '0px !important',
            color: '#fff !important',
        },
    },
    prod_grid_container : {
        marginTop: '10px',
        marginBottom: '10px',
        justifyContent: 'center',
    },
}