# Mercur System Architecture Diagrams

## 1. High-Level System Architecture

```mermaid
graph TD
    A[Client Applications] --> B[API Gateway]
    B --> C[Medusa Backend]
    C --> D[(PostgreSQL Database)]
    C --> E[Redis Cache]
    C --> F[File Storage]
    
    G[Admin Dashboard] --> B
    H[Seller Panel] --> B
    I[Storefront] --> B
    
    C --> J[Custom Modules]
    J --> K[Seller Module]
    J --> L[Commission Module]
    J --> M[Marketplace Module]
    J --> N[Review Module]
    J --> O[Attribute Module]
    
    C --> P[Workflows]
    P --> Q[Order Processing]
    P --> R[Seller Management]
    P --> S[Payment Processing]
    
    C --> T[Event Subscribers]
    T --> U[Notifications]
    T --> V[Search Indexing]
    T --> W[Payout Processing]
```

## 2. Module Architecture

```mermaid
graph TD
    A[Medusa Core Modules]
    B[Custom Mercur Modules]
    
    A --> C[Product Module]
    A --> D[Order Module]
    A --> E[Customer Module]
    A --> F[Payment Module]
    A --> G[Inventory Module]
    
    B --> H[Seller Module]
    B --> I[Marketplace Module]
    B --> J[Commission Module]
    B --> K[Review Module]
    B --> L[Attribute Module]
    B --> M[Brand Module]
    B --> N[Payout Module]
    B --> O[Request Module]
    B --> P[Wishlist Module]
    
    H --> Q[Seller Entity]
    H --> R[Member Entity]
    H --> S[Invite Entity]
    H --> T[Onboarding Entity]
    
    I --> U[OrderSet Entity]
    
    J --> V[CommissionRule Entity]
    J --> W[CommissionRate Entity]
    J --> X[CommissionLine Entity]
    
    K --> Y[Review Entity]
    
    L --> Z[Attribute Entity]
    L --> AA[AttributeValue Entity]
    L --> AB[AttributePossibleValue Entity]
```

## 3. API Layer Architecture

```mermaid
graph TD
    A[API Endpoints]
    B[Authentication Layer]
    C[Validation Layer]
    D[Business Logic Layer]
    E[Data Access Layer]
    
    A --> B
    B --> C
    C --> D
    D --> E
    
    F[Admin API]
    G[Store API]
    H[Vendor API]
    
    A --> F
    A --> G
    A --> H
    
    F --> I[Seller Management]
    F --> J[Commission Configuration]
    F --> K[Order Management]
    F --> L[Request Handling]
    
    G --> M[Product Browsing]
    G --> N[Cart Management]
    G --> O[Order Processing]
    G --> P[Review Submission]
    
    H --> Q[Product Management]
    H --> R[Order Management]
    H --> S[Commission Tracking]
```

## 4. Workflow Architecture

```mermaid
graph TD
    A[Workflows]
    B[Steps]
    C[Hooks]
    
    A --> D[Order Processing Workflow]
    A --> E[Seller Management Workflow]
    A --> F[Commission Calculation Workflow]
    A --> G[Payout Processing Workflow]
    
    D --> H[Split Cart Step]
    D --> I[Create Orders Step]
    D --> J[Reserve Inventory Step]
    D --> K[Create Payments Step]
    
    E --> L[Create Seller Step]
    E --> M[Create Member Step]
    E --> N[Create Onboarding Step]
    
    F --> O[Calculate Commission Step]
    F --> P[Create Commission Lines Step]
    
    G --> Q[Process Payout Step]
    
    C --> R[Order Placed Hook]
    C --> S[Seller Created Hook]
    C --> T[Payment Captured Hook]
```

## 5. Data Model Relationships

```mermaid
erDiagram
    SELLER ||--o{ MEMBER : has
    SELLER ||--o{ INVITE : has
    SELLER ||--|| ONBOARDING : has
    SELLER }|--|{ PRODUCT : "linked to"
    SELLER }|--|{ ORDER : "linked to"
    
    ORDER_SET ||--o{ ORDER : contains
    ORDER ||--o{ ORDER_ITEM : has
    
    COMMISSION_RULE ||--|| COMMISSION_RATE : has
    COMMISSION_RATE ||--o{ COMMISSION_LINE : generates
    
    PRODUCT ||--o{ ATTRIBUTE_VALUE : has
    ATTRIBUTE ||--o{ ATTRIBUTE_POSSIBLE_VALUE : has
    ATTRIBUTE ||--o{ ATTRIBUTE_VALUE : has
    
    CUSTOMER ||--o{ REVIEW : creates
    PRODUCT ||--o{ REVIEW : receives
    SELLER ||--o{ REVIEW : receives
    
    ORDER_ITEM ||--|| COMMISSION_LINE : "generates for"
    
    PAYMENT_COLLECTION ||--o{ PAYMENT : has
    PAYMENT ||--o{ SPLIT_ORDER_PAYMENT : splits
```

## 6. Event System Architecture

```mermaid
graph TD
    A[Event Publishers]
    B[Event Subscribers]
    C[Event Bus]
    
    A --> C
    C --> B
    
    D[Order Service]
    E[Payment Service]
    F[Seller Service]
    
    A --> D
    A --> E
    A --> F
    
    G[Order Placed Event]
    H[Payment Captured Event]
    I[Seller Status Changed Event]
    
    D --> G
    E --> H
    F --> I
    
    J[Notification Subscriber]
    K[Search Indexing Subscriber]
    L[Payout Processing Subscriber]
    
    B --> J
    B --> K
    B --> L
    
    G --> J
    G --> K
    H --> J
    H --> L
    I --> J
```

## 7. Deployment Architecture

```mermaid
graph LR
    A[Load Balancer] --> B[Medusa Backend Instances]
    A --> C[Medusa Backend Instances]
    A --> D[Medusa Backend Instances]
    
    B --> E[(PostgreSQL)]
    C --> E
    D --> E
    
    B --> F[(Redis)]
    C --> F
    D --> F
    
    B --> G[File Storage]
    C --> G
    D --> G
    
    H[Admin Dashboard] --> A
    I[Seller Panel] --> A
    J[Storefront] --> A
```

## 8. Payment Flow Architecture

```mermaid
graph TD
    A[Customer] --> B[Storefront]
    B --> C[Cart Creation]
    C --> D[Checkout Process]
    D --> E[Payment Authorization]
    E --> F[Order Splitting]
    F --> G[Order Creation]
    G --> H[Inventory Reservation]
    H --> I[Payment Capture]
    I --> J[Commission Calculation]
    J --> K[Payout Processing]
    
    L[Stripe] --> E
    L --> I
    
    M[Seller 1]
    N[Seller 2]
    O[Seller N]
    
    F --> M
    F --> N
    F --> O
    
    K --> M
    K --> N
    K --> O