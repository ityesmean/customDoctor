package hello.hellospring.repository;

import hello.hellospring.domain.Member;

import java.util.*;

public class MemoryMemberRepository implements MemberRepository {

    private static Map<Long, Member> store = new HashMap<>();
    private static long sequence = 0L;
    @Override
    public Member save(Member member) {
        member.setId(++sequence);
        store.put(member.getId(), member);
        return member;
    }

    @Override
    public Optional<Member> findById(Long id) {
        // null이 반환될 가능성이 있으면 Optional 로 감싼다.
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public Optional<Member> findByName(String name) {
        return store.values().stream()
                // member -> member.getName이 파라미터로 넘어온 name이랑 같은지 확인
                // 같으면 필터링 되는 거고
                .filter(member -> member.getName().equals(name))
                // 그냥 같으면 반환 됨
                .findAny();
    }

    @Override
    // 반환은 List 로 되어있음 => 실무할 땐 List를 많이 씀 => 루프 돌리기도 편하고 등등..
    public List<Member> findAll() {
        // store.values 는 member 들임.
        return new ArrayList<>(store.values());
    }
    public void clearStore() {
        store.clear();
    }
}
