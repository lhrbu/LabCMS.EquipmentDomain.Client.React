import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import ProjectsWebCacheService from './Services/ProjectsWebCacheService';
import EquipmentHourlyRatesWebCacheService from './Services/EquipmentHourlyRatesWebCacheService';


async function Initialize()
{
  const _projectsWebCacheService = ProjectsWebCacheService.Instance();
  const _equipmentHourlyRateWebCacheService = EquipmentHourlyRatesWebCacheService.Instance();
  
  try {
    await Promise.all([
      _projectsWebCacheService.RefreshCacheAsync(),
      _equipmentHourlyRateWebCacheService.RefreshCacheAsync()]);
  } catch (error) {
    window.alert("Can't load project or equipment hourly rate information.");
  }



   ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'));
    // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}


Initialize();


