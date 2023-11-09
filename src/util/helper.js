/* eslint-disable*/
import React from 'react';






export const  validEmail =  (email) => {
    let reg = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    return reg.test(email);
};


   
