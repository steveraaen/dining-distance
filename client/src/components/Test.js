import React, { Component } from 'react';

var dta = [
    {
        "id": 1,
        "name": "a",
        "another": [
        {
            "anotherId": 2,
            "anotherName": "Content1",
            "format": [
            {
                "format": "format1",
                "isEnabled": true,
                "volume": 8
            },
            {
                "format": "format2",
                "isEnabled": true,
                "volume": 6
            }
            ]
        },
        {
            "anotherId": 3,
            "anotherName": "Content2",
            "format": [
            {
                "format": "format4",
                "isEnabled": true,
                "volume": 13
            },
            {
                "format": "format5",
                "isEnabled": true,
                "volume": 20
            }
            ]
        }
        ]
    },
    {
        "id": 2,
        "name": "b",
        "another": [
        {
            "anotherId": 6,
            "anotherName": "Content6",
            "format": [
            {
                "format": "format6",
                "isEnabled": true,
                "volume": 7
            },
            {
                "format": "format6",
                "isEnabled": false,
                "volume": 0
            }
            ]
        }
        ]
    }
]
    
export default function Test(props) {

var fmtd = dta.map((la, idx) => {
    var fmt1 = la.another.map((lb, idx2) => {
        return(
    <div key = {idx2}>    
        <tr style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}} >
            <td style={{paddingRight: 10, fontSize: 16, fontWeight: 'bold'}}> {la.id}</td><td style={{paddingLeft: 10, fontSize: 16, fontWeight: 'bold'}}> {la.name}</td>
        </tr>
        <tr style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            <td style={{paddingRight: 10, fontSize: 16, fontWeight: 'bold'}}> {lb.anotherId}</td><td style={{paddingLeft: 10, fontSize: 16, fontWeight: 'bold'}}> {lb.anotherName}</td>
        </tr>
        { lb.format.map((lc, idx3) => {
            let volBar = []
            for(let i = 0; i <21; i++){
                i === lc.volume ? volBar.push(lc.volume) : volBar.push("-")
            }
        return(
        <tr key={idx3}style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            <td style={{paddingRight: 10, fontSize: 16, fontWeight: 'bold'}}> 
                {lc.format}
            </td>
            <td style={{paddingLeft: 10, fontSize: 16, fontWeight: 'bold'}}> 
            {lc.isEnabled}
            </td>
            <td style={{paddingLeft: 10, fontSize: 16, fontWeight: 'bold'}}> 
            {volBar}
            </td>
        </tr>)
        })}
    </div>)
    })
        return (      
         <table>
            <tbody>
            {fmt1}
            </tbody>
         </table>

        )
})
return fmtd
}


















