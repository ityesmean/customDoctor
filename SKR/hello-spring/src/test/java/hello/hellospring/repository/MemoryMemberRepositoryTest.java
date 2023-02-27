package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.lang.annotation.Target;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

// 모든 test는 서로 순서와 관계없이 의존관계없이 설계되야함. => 저장소나 공용데이터를 깔끔하게 지워줘야함.
// 모든 test는 순서랑 상관없이 메소드별로 다 따로 동작하게 설계해야함
public class MemoryMemberRepositoryTest {

    MemoryMemberRepository repository = new MemoryMemberRepository();

    //test가 끝날때마다 repository를 깔끔하게 지워주는 코드를 만들어야함.
    @AfterEach // callback 메서드
    public void afterEach() {
        repository.clearStore();
    }
    @Test
    public  void save() {
        Member member = new Member();
        member.setName("spring");

        repository.save(member);
        // Optional 에서 꺼낼때는 get을 쓰는 방법이 있는데
        // 바로 꺼내는게 좋은 방법은 아님
        Member result = repository.findById(member.getId()).get();
        // System.out.println("result = " + (result == member));

        // 1. Assertions.assertEquals(member, result);
        assertThat(member).isEqualTo(result);
    }

    @Test
    public void findByName() {

        Member member1 = new Member();
        member1.setName("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        repository.save(member2);

        Member result = repository.findByName("spring1").get();// True


        assertThat(result).isEqualTo(member1);
    }

    @Test
    public void findAll() {
        Member member1 = new Member();
        member1.setName("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        repository.save(member2);

        List<Member> result = repository.findAll();

        assertThat(result.size()).isEqualTo(2);
    }

}
