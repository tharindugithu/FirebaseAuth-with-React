import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom";
// export default function PrivateRoute({ component: Component, ...rest }) {
//     const { currentUser } = useAuth()

//     return (
//         <Route
//             {...rest}
//             render={props => {
//                 return currentUser ? <Component {...props} /> : <Navigate to="/login" />
//             }}
//         ></Route>
//     )
// }

export default function PrivateRoute({ children }) {
    const { currentUser } = useAuth();

    return currentUser ? children : <Navigate to="/login" />;
}