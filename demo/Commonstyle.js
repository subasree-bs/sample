export const commonstyle = {
    container : {
        bgcolor: '#fff',
        height: 'max-content',
        borderTop: '5px solid #7009AB;',
        borderLeft: '0px',
        borderRight: '0px',
        borderBottom: '0px',
        borderRadius: '10px',
        boxShadow: '6px 6px 6px 9px #dedbdbae',
    },
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
    // list products - filter
    productlist_select_formcontrol:{
        m: 1,
        borderRadius: 2,
    },
    productlist_delete_btn:{
        backgroundColor: "#f5365c",
        borderColor: "#f41e48",
        fontSize: 10,
        "&:hover": {
            backgroundColor: "#f50e3c",
            color: "#fff",
        },
    },
    productlist_addtolocation_btn:{
        backgroundColor: "#2dce89",
        borderColor: "#28b97b",
        fontSize: 10,
        "&:hover": {
            backgroundColor: "#209764",
            color: "#fff",
        },
    },
    productlist_remove_btn:{
        backgroundColor: "#001f3f",
        borderColor: "#001f3f",
        fontSize: 10,
        "&:hover": {
            backgroundColor: "#14477c",
            color: "#fff",
        },
    },
    productlist_deactive_btn:{
        backgroundColor: "#ffad46",
        borderColor: "#ffa22d",
        fontSize: 10,
        "&:hover": {
            backgroundColor: "#ff8e00",
            color: "#fff",
        },
    },
    productlist_viewbtn:{
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
    productlist_tabpanel:{
        padding: 0, 
        pt: 3 
    },
    productlist_tab:{
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
    productlist_add:{
        float: "right",
        width: 90,
        fontWeight: 600,
        mr: 1,
        backgroundColor: "#7009AB",
         mt: -5,
         "&:hover":{
            backgroundColor: "#fff",
            border: "1px solid #7009AB",
            color: "#7009AB",
         }
    },
    productlist_actionsdropdown:{
        backgroundColor:"#b97df0",
        fontSize: 11,
        "&:hover":{
            backgroundColor: "#fff",
            color: "#b97df0"
        }
    }
}