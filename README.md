# EXPO

### Managed Workflow vs Bare Workflow

- **Managed Workflow**: android, ios 네이티브와 관련된 디렉토리의 코드를 **직접 수정하지 않으면서** 개발하는 플로우

- **Bare Workflow**: android, ios 네이티브와 관련된 디렉토리의 코드를 **직접 수정**하면서 개발하는 플로우 (react-native-cli 로 개발하는 것과 동일)

### Custom Native Code Third Party Library

- 네이티브 설정을 해야하는 third party lib의 경우 **development build** 또는 **local build** 가 필요
- **development build**: **EAS build**로 빌드가 가능

  - **EAS build**

    - EAS server(원격 서버)에서 빌드를 진행
    - 내부에서 **pre build**를 진행
    - _npx expo start --dev-client_ 를 이용하여 서버를 실행

- **local build**: local computer에서 빌드를 진행

  - 로컬 빌드 전에 직접 **pre build** 를 진행해야 함
  - npx expo run:android 또는 npx expo run:ios 명령어 실행 시 android 또는 ios 디렉토리가 없을 경우 pre build를 한 번 진행함

> #### \*pre build
>
> - **config pulgins** 를 이용하여 네이티브 설정을 변경
> - _npx expo prebuild_ 명령어를 실행하면 네이티브와 관련된 디렉토리인 android와 ios 디렉토리가 생성됨.  
>   이 때, config plugins를 기반으로 _자동으로_ 네이티브 코드가 설정됨.
> - **Bare Workflow 와의 차이점**: Bare Workflow는 네이티브 설정을 _수동으로_ 직접 진행

- native 설정이 필요한 third party lib가 추가될 경우, 추가된 라이브러리를 반영하기 위해서는 다시 빌드해야 함  
  (**pre build**를 실행시켜서 네이티브 설정들을 반영한 후 네이티브 런타임(환경)을 다시 구축해야 하므로)
- **EAS build**는 시간이 너무 오래 걸림 (android: 약 10분, ios: 약 20분)
- 결국 개발 시에는 **local build**도 같이 활용할 수 밖에 없음
- 실제 기기(physical device)에서 확인을 하려면 **EAS build**를 진행해야만 가능
- 따라서 **EAS build**를 돌려놓고, **local build**로 빌드하고 에뮬레이터와 시뮬레이터로 확인하면서 개발을 진행해야 흐름이 끊기지 않음
