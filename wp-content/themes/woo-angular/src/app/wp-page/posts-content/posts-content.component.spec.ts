import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsContentComponent } from './posts-content.component';

describe('PostsContentComponent', () => {
  let component: PostsContentComponent;
  let fixture: ComponentFixture<PostsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
