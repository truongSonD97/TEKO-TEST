## List api for frontend
1. Login,Logout
2. Register
3. Get movies
4. Get time clusters
5. Order a ticket //authorized user do: request with token
6. Confirm ticket: status='cancelled','paid'//staff can confirm the ticket that created by other user

## List api for admin
1. Add, update, delete, get movie
2. Add, Update, get Cluster 



## Third party api

Each party, create a user that connected with theme

1. Register partner: company name, username, password,...=> token - forever
2. Get movies
3. Get time clusters
4. Order a ticket: //call request with token: pending
5. Confirm ticket: status='cancelled','paid'//user only can confirm their ticket
 - Check partner has transfer money or not?
## Cấu trúc hệ thống 
1. Hệ thống được phân gồm file index.js là nơi điểm vào của chương trình 
2. api là thư mục chưa các source liên quan tới models, controllers, và routers của hệ thống.

### index.js 
Lời nơi chương trình đi vào đầu tiền, tại đây dùng để thiết lập một số thông số của hệ thống như PORT, link  database, khởi tạo expressJS . </br>

### API 
Chứa 3 thư mục chính là </br>
1. modules : là nơi chứa các đối tượng  dữ liệu chính của hệ thống và tương tác với cơ sỡ dữ liệu mongo. </br>
    Có 6 đối tượng chính trong Modules là : <br>
        + movieModel  : đối tượng chứa các thuộc tính về  phim </br>
        + timeCluster : đối tượng chứa các thuộc tính về xuất chiếu phim </br>
        + ticketModel : đối tượng chứa các thuộc tính về vé xem phim </br>
        + thirdPartyModel  : đối tượng chứa các thông tin về bên người dùng thứ 3 </br>
        +userModel : Đối tượng chứa các thông tin liên quan tới người dùng 
2. Route:
    Hệ thống sẽ có 3 nhóm route chính tương ứng với 3 nhóm người dùng là admin, user và thirdParty : </br>
    




