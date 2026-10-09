import type {ComponentType} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import type { Location, NavigateFunction, Params } from 'react-router-dom'

export interface RouterProps {
    location: Location
    navigate: NavigateFunction
    params: Readonly<Params>
}

export function withRouter<P extends RouterProps>(Comp: ComponentType<P>) {
    return function Wrapped(props: Omit<P, keyof RouterProps>) {
        const location = useLocation()
        const navigate = useNavigate()
        const params = useParams()
        return <Comp {...(props as P)} location={location} navigate={navigate} params={params} />
    }
}