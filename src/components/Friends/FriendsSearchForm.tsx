import {Field, Form, Formik} from 'formik'
import React from 'react'
import {FilterType, getFriendsThunkCreator} from '../../Redux/friendsReducer'
import { useDispatch, useSelector} from 'react-redux'
import {getPageSize, getUsersFilter} from '../../Redux/componentsSelectors'
import { AppStateType } from '../../Redux/reduxStore'
import { ThunkDispatch } from "redux-thunk";

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type FriendFormType = 'true' | 'false' | 'null'

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}



export const FriendsSearchForm: React.FC = React.memo((props) => {
    const filter = useSelector(getUsersFilter)
    const pageSize= useSelector(getPageSize)
    const dispatch: ThunkDispatch<AppStateType, undefined, any> = useDispatch();
    
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getFriendsThunkCreator(1, pageSize, filter))
    }
    
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        dispatch(onFilterChanged(filter))
        setSubmitting(false)
    }

    return <div>
        <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>

                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})