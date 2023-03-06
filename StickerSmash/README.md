### 1. 타입스크립트

- npx create-expo-app -t expo-template-blank-typescript

### 2. eslint & pritter

- npm i -D eslint prettier @react-native-community/eslint-config  
  (@typescript-eslint/parser @typescript-eslint/eslint-plugin 은 필요 없는 듯)
- .eslintrc.js 설정  
  module.exports = {  
  &emsp;root: true,  
  &emsp;extends: '@react-native-community',  
  &emsp;rules: {  
  &emsp;&emsp;'react/react-in-jsx-scope': 'off',  
  &emsp;&emsp;'no-unused-vars': 'off',  
  &emsp;&emsp;'@typescript-eslint/no-unused-vars': 'warn',  
  &emsp;},  
  };
- .pritterrc.js 설정  
  module.exports = {  
  &emsp;arrowParens: 'avoid',  
  &emsp;bracketSameLine: true,  
  &emsp;bracketSpacing: false,  
  &emsp;singleQuote: true,  
  &emsp;trailingComma: 'all',  
  };

### 3. 절대 경로 혹은 경로 별칭 설정

- EXPO_USE_PATH_ALIASES=1 환경 변수 설정
- tsconfig.json 설정
  - 절대 경로  
    {  
    &emsp;"compilerOptions": {  
    &emsp;"baseUrl": "src"  
    &emsp;}  
    }
  - 별칭  
    {
    &emsp;"compilerOptions": {
    &emsp;&emsp;"baseUrl": ".",
    &emsp;&emsp;"paths": {
    &emsp;&emsp;&emsp;"@/_": ["src/_"]
    &emsp;&emsp;}
    &emsp;}
    }

---

### @expo/vector-icons

##### \- 설치 및 설정

- npx expo install @expo/vector-icons
- react-native-cli 와는 달리 별도 설정 필요 없음.
- 아이콘 이름의 타입이 유니온 타입으로 설정되어 있음. 따라서 prop으로 전달 시  
  iconName: keyof typeof MaterialIcons.glyphMap; 와 같이 설정해야 함.

---

### expo-image-picker

##### \- 설치 및 설정

- npx expo install expo-image-picker
- react-native-cli 와는 달리 별도 설정 필요 없음.

---

### React Native Gesture Handler & Reanimated library

##### \- 설치 및 설정

1. npx expo install react-native-gesture-handler react-native-reanimated
2. npm install -D @babel/plugin-proposal-export-namespace-from
3. babel.config.js 설정
   module.exports = function (api) {  
   &emsp;api.cache(true);  
   &emsp;return {  
   &emsp;&emsp;presets: ['babel-preset-expo'],  
   &emsp;&emsp;plugins: [<br>
   &emsp;&emsp;&emsp;"@babel/plugin-proposal-export-namespace-from",<br>
   &emsp;&emsp;&emsp;"react-native-reanimated/plugin",<br>
   &emsp;&emsp;],  
   &emsp;};  
   };

- **React Native Gesture Handler**: Tap, Pan, Rotation 등을 감지해주는 라이브러리
  - _GestureHandlerRootView_: 제스처를 인식하기 위해서는 이를 앱 최상단에 랩핑해야 함.
  - _TapGestureHandler_: 탭을 인식  
     \<TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>  
    &emsp;{...}  
    \</TapGestureHandler>
  - _PanGestureHandler_: 드래그 앤 드롭을 인식
    \<PanGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>  
    &emsp;{...}  
    \</PanGestureHandler>
- **Reanimated library**: 제스처 사이에 애니메이션을 부여할 수 있게 해주는 라이브러리
  - _Animated.createAnimatedComponent(컴포넌트)_: 애니메이션을 부여할 컴포넌트를 생성  
     const AnimatedImage = Animated.createAnimatedComponent(Image);
  - _useSharedValue()_: 애니메이션 값을 갖는 레퍼런스를 생성 / 실제값은 .value로 접근  
    const scaleImage = useSharedValue(초기값);
  - _useAnimatedGestureHandler()_: 애니메이션 값을 변화시킬 함수(제스처 핸들러)를 생성  
    const onDoubleTap = useAnimatedGestureHandler({  
    &emsp;onActive: () => {  
    &emsp;&emsp;if (scaleImage.value) {  
    &emsp;&emsp;&emsp;scaleImage.value = scaleImage.value \* 2;  
    &emsp;&emsp;}  
    &emsp;},  
    });
  - _withSpring()_: spring 애니메이션 효과
  - _useAnimatedStyle()_: 애니메이션 값에 따라 애니메이션 스타일을 정의  
    const imageStyle = useAnimatedStyle(() => {  
    &emsp;return {  
    &emsp;&emsp;width: withSpring(scaleImage.value),  
    &emsp;&emsp;height: withSpring(scaleImage.value),  
    &emsp;};  
    });

### react-native-view-shot & expo-media-library

- 미디어 라이브러리에 접근하기 위해서는 권한이 필요
- const [status, requestPermission] = MediaLibrary.usePermissions();  
  if (status === null) {  
  &emsp;requestPermission();  
  }

### expo-status-bar

- React Native에서 제공하는 status bar와의 차이점은...?

### Splash Screen

- **app.json**: _splash_ 객체에서 값들을 설정(react-native-cli 와 달리 굉장히 간단)

### App Icon

- **app.json**: _icon_ 객체에서 값들을 설정(react-native-cli 와 달리 굉장히 간단)
