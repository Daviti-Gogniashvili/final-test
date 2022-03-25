import { PureComponent } from 'react';

import './ProgressBar.style';
import { withRouter } from 'react-router-dom';

export class ProgressBar extends PureComponent {

    constructor() {
        super();
        this.state = {
            List: []
        }
    }

    componentDidMount() {
        Object.entries(this.props.stepMap).map(([key,value],index)=>(
            this.setState({[key]: index+1})
        ))
        this.historyListener();
        this.setState({
            List: [...this.state.List, Object.keys(this.props.stepMap).indexOf(this.props.checkoutStep)]
            
        })
    }

    historyListener() {
        this.props.history.listen((location,action)=>{
            if(action==="POP") {
                this.setState({
                    List: [...this.state.List.filter(e => e === Object.keys(this.props.stepMap).indexOf(this.props.checkoutStep))],
                    [Object.keys(this.props.stepMap)[Object.keys(this.props.stepMap).indexOf(this.props.checkoutStep)]]: Object.keys(this.props.stepMap).indexOf(this.props.checkoutStep)+1
                })
                this.setState({
                    List: [...new Set(this.state.List)]
                })
                console.log(this.state.List);
            }
            if(action==="PUSH") {
                this.setState({
                    List: [...this.state.List, Object.keys(this.props.stepMap).indexOf(this.props.checkoutStep)],
                    [Object.keys(this.props.stepMap)[Object.keys(this.props.stepMap).indexOf(this.props.checkoutStep)-1]]: "✔"
                    
                })
                console.log(this.state.List);
            }
    })
    }

    renderProgressBar() {
        return(
            <>
                {Object.entries(this.props.stepMap).map(([key,value],index)=>(
                    <>
                        {this.state.List[index] === index ? 
                            <div className={`ProgressBar-Line active`}></div> : 
                                <div className={`ProgressBar-Line`}></div>
                        }
                        <div className='ProgressBar-Container'>
                            {this.state.List[index] === index ?
                                <div className={`ProgressBar-Circle active-circle`}>{this.state[key]}</div> : 
                                    <div className={`ProgressBar-Circle`}>{index+1}</div>
                            }   
                            {this.state.List[index] === index ? 
                                <div className={`ProgressBar-Page active-page`}>{value.title}</div> : 
                                    <div className={`ProgressBar-Page`}>{value.title}</div>
                            }
                        </div>
                    </>
                ))}
            </>
        )
    }

    render() {
        return (
            <div block="ProgressBar">
                {this.renderProgressBar()}
            </div>
        );
    }
}

export default withRouter(ProgressBar);
