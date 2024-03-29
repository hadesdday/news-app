import { Component, OnInit } from '@angular/core';
import { PostService } from "../../post/post.service";
import { TokenStorageService } from "../../_service/token-storage.service";
import { CommonService } from "../../_service/common.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-saved-post',
  templateUrl: './saved-post.component.html',
  styleUrls: ['./saved-post.component.scss']
})
export class SavedPostComponent implements OnInit {
  items: any;

  constructor(private titleService: Title, private postService: PostService, private tokenStorage: TokenStorageService, private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Tin đã lưu | News");
    this.postService.get_savedPost(this.tokenStorage.getUser().id).subscribe(res => {
      console.log(res)
      this.items = res
    })

  }

  choose_all() {
    const ul = document.getElementsByClassName("list-group")[0]
    const lis = ul.getElementsByClassName('list-group-item')
    for (let i = 0; i < lis.length; i++) {
      const input = lis[i].getElementsByTagName('input')[0]
      input.checked = true
    }
  }

  delete_saved_posts() {
    let isError = false
    const ul = document.getElementsByClassName("list-group")[0]
    const lis = ul.getElementsByClassName('list-group-item')
    for (let i = 0; i < lis.length; i++) {
      const input = lis[i].getElementsByTagName('input')[0]
      if (input.checked) {
        ul.removeChild(lis[i])
        this.postService.delete_saved_post(input.id).subscribe(res => {

        }, error => {
          isError = true;
        })
      }
    }
    if (isError) {
      this.commonService.toastError("Đã xáy ra lỗi khi xóa! xin vui lòng thử lại")
    } else this.commonService.toastSuccess("Đã xóa thành công")

  }
}
