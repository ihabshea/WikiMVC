import React, { useState, useEffect } from 'react';
import useEffectAsync from '../../helpers/useEffectAsync';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
const HasCategory = ({ authD, articleId }) => {
    const [categoryModal, setCM] = useState(false);
    const [category, setCategory] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [categories, retrieveCategories] = useState([{}]);
    useEffectAsync(async () => {
        await fetchCategories();
        await whatCategory();
    }, []);

    const categorize = async () => {
        // setLoaded(false);
        const requestBody = {

            query: `
        mutation {
          categorize(articleId: "${articleId}", category: "${category}"){
            _id
          }
        }`
        };
        await fetch('http://localhost:9000/graphql',

            {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authD.token
                }
            }
        )
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('failed');
                }
                return res.json();
            }).then(resData => {
                console.log(resData);
                if (!resData.data.category)
                    setCM(false);
            }).catch(err => {
                throw (err);
            })

        // setLoaded(true);
    }

    const fetchCategories = async () => {
        // setLoaded(false);
        setLoaded(false);
        const planguage = localStorage.getItem("language");
        const requestBody = {

            query: `
    query {
      categories(language: "${planguage}"){
        _id
        shorthand
        titles{
            text
        }
      }
    }`
        };
        await fetch('http://localhost:9000/graphql',

            {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',

                }
            }
        )
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('failed');
                }
                return res.json();
            }).then(resData => {
                // console.log(resData);
                retrieveCategories(resData.data.categories);
                console.log(resData.data.categories);
                setLoaded(true);
            }).catch(err => {
                throw (err);
            })

        // setLoaded(true);
    }
    const whatCategory = async () => {
        // setLoaded(false);
        const requestBody = {

            query: `
    query {
      category(articleId: "${articleId}"){
        _id
      }
    }`
        };
        await fetch('http://localhost:9000/graphql',

            {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('failed');
                }
                return res.json();
            }).then(resData => {
                console.log(resData);
                if (!resData.data.category)
                    setCM(true);
            }).catch(err => {
                throw (err);
            })

        // setLoaded(true);
    }
    console.log(categories);
    return (
        <>
            {loaded ?
                <Dialog open={categoryModal} onClose={() => { setCM(false) }} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Language</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please choose one of the languages available below.
                    </DialogContentText>
                        <Select
                            native
                            value={category}
                            onChange={(e) => { setCategory(e.target.value) }}
                            input={<FilledInput name="age" id="filled-age-native-simple" />}
                        >
                            <option value="" />
                            {categories.map(category => {
                                return (
                                    <option value={category._id}>
                                        {category.titles.text}  
                                    </option>
                                )
                            })}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setCM(false) }} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={categorize} color="primary">
                            Categorize
                    </Button>
                    </DialogActions>
                </Dialog>
                :
                <div class="sk-folding-cube">
                    <div class="sk-cube1 sk-cube"></div>
                    <div class="sk-cube2 sk-cube"></div>
                    <div class="sk-cube4 sk-cube"></div>
                    <div class="sk-cube3 sk-cube"></div>
                </div>
            }
        </>
    )
}
export default HasCategory;