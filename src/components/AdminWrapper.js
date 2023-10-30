import React, {useEffect} from "react";
import { useRouter } from "next/router";
import axios from "axios";

// Layout Component
import AdminNavbar from "@/components/AdminNavbar";
import Sidebar from "@/components/Sidebar";
import Layout from "@/components/Layout";

import { connect } from "react-redux";
import { setUser } from "@/redux/actions/setUserAction";

const AdminWrapper = (props) => {
    const router = useRouter()
    const { setUser } = props;
    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('');
                    setUser(data);
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        router.push('/login');
                    }

                    if (error.response && error.response.status === 403) {
                        router.push('/login');
                    }

                    if (error.response && error.response.status === 404) {
                        router.push('/login');
                    }
                }
            }
        )()

    }, [setUser, router])
    
    return (
        <Layout>
            <Sidebar/>
            <div className="relative md:ml-64 bg-blueGray-100">
                <AdminNavbar/>
                {props.children}
            </div>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    // console.log(state.user); // * Always console log first for showing the response data
    return {
      user: state.user.user
    }
  }  

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminWrapper);