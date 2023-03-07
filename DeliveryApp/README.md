# Delivery App

#### BottomTab Navigation

- tabBarActiveTintColor: 아이콘에 color prop을 할당해야만 적용됨

#### TextInput Props

- keyboardType
- returnKeyType
- secureTextEntry
- autoCapitalize
- autoCorrect

### Interceptor

- 에러 인터셉터:
  - **return**: **이전 요청에 대한 응답**
  - **throw**: **이전 요청에 대한 에러**
- 에러 인터셉터 처리 중 **재요청**을 해서 받은 **응답을 반환**해야만 함.
