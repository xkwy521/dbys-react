import React,{Component} from 'react';
import Header from '@/components/Header'
import {DetailUrl} from '@/components/config'
import HttpServer from '@/components/fetch'
import Error from '@/components/Error'
import { NavLink } from 'react-router-dom';
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      id: 0
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.id !== state.id) {
      return {
        id: props.match.params.id,
        data:{
          status: 3
        }
      }
    }
    return null;
  }

  async getData(url) {
    let data = await HttpServer(url,'detail')
    this.setState({
      data: data
    })
  }

  componentDidMount(){
    console.log(this.state.id)
    const url = DetailUrl(this.state.id)
    this.getData(url)
  }
  render() {
    const {data} = this.state
    return (
      <div>
        {data.status === 0?
          <div>
            <Header menu={data.menu} menumore={data.menumore} />
            <section className="content has-header">
              <div className="block catalog">
                <NavLink to={'/player/'+data.detail.player} >{data.detail.player}</NavLink>
              </div>
            </section>
          </div>
          :
          <Error data={data} />
        }
      </div>
    )
  }
}